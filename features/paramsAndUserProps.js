/**
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

function writeExistingParamsAndUserPropsToSheet() {
  clearRangeContent('modifyParamsAndUserProps', 'settings');
  writeToSheet(listParamsAndUserProperties(), 'modifyParamsAndUserProps', 'settings');
}

function writeGA4TagsToParamsAndUserPropertiesSheet() {
  const ga4EventTags = listGA4EventTags();
  const formattedGA4EventTags = ga4EventTags.reduce((arr, tag) => {
    arr.push([tag.name, tag.tagId, '', '', '']);
    return arr;
  }, []);
  clearRangeContent('modifyParamsAndUserProps', 'settings');
  writeToSheet(formattedGA4EventTags, 'modifyParamsAndUserProps', 'settings');
}

function listParamsAndUserProperties() {
  const ga4EventTags = listGA4EventTags();
  return ga4EventTags.reduce((arr, eventTag) => {
    eventTag.parameter.forEach(param => {
      if (param.type == 'list') {
        let mapType = '';
        if (param.key == 'eventParameters') {
          mapType = 'parameter';
        } else if (param.key == 'userProperties') {
          mapType = 'user_property';
        }
        param.list.forEach(map => {
          if (map.map[0].key == 'name') {
            arr.push([
              eventTag.name,
              eventTag.tagId,
              mapType,
              map.map[0].value,
              map.map[1].value
            ]);
          } else {
            arr.push([
              eventTag.name,
              eventTag.tagId,
              mapType,
              map.map[1].value,
              map.map[0].value
            ]); 
          }
        });
      }
    });
    return arr;
  }, []);
}

function modifyParametersAndUserProperties() {
  const ga4EventTags = listGA4EventTags();
  const newSettings = organizeParamsAndUserPropsByTag();
  ga4EventTags.forEach(tag => {
    if (newSettings[tag.tagId]) {
      const paramAndUserPropertySettings = newSettings[tag.tagId];
      let parametersAdded = false;
      let userPropertiesAdded = false;
      tag.parameter.forEach(param => {
        if (param.type == 'list') {
          if (param.key == 'eventParameters') {
            param.list = removeParams(param.list, paramAndUserPropertySettings.remove.parameter);
            param.list = param.list.concat(paramAndUserPropertySettings.create.parameter);
            parametersAdded = true;
          } else if (param.key == 'userProperties') {
            param.list = removeParams(param.list, paramAndUserPropertySettings.remove.user_property)
            param.list = param.list.concat(paramAndUserPropertySettings.create.user_property);
            userPropertiesAdded = true;
          }
        }
      });
      if (!parametersAdded && paramAndUserPropertySettings.create.parameter.length > 0) {
        tag.parameter.push({
          type: 'list',
          key: 'eventParameters',
          list: paramAndUserPropertySettings.create.parameter
        });
      }
      if (!userPropertiesAdded && paramAndUserPropertySettings.create.user_property.length > 0) {
        tag.parameter.push({
          type: 'list',
          key: 'userProperties',
          list: paramAndUserPropertySettings.create.user_property
        });
      }
      const result = updateGTMResource('tags', getSelectedWorkspacePath() + '/tags/' + tag.tagId, tag);
      if (result != 'error') {
        const actionTaken = generateSuccessfullActionTakenText(newSettings[tag.tagId]);
        logChange(tag.name, tag.type, tag.tagId, actionTaken, tag.tagManagerUrl)
      } else {
        logChange(tag.name, tag.type, tag.tagId, 'No Change - Parameter Modification Failed', tag.tagManagerUrl)
      }
    }
  });
}

function organizeParamsAndUserPropsByTag() {
  const data = getDataFromSheet('modifyParamsAndUserProps', 'settings');
  return data.reduce((tagObj, row) => {
    const tagId = row[1];
    const type = row[2];
    const name = row[3];
    const value = row[4];
    const action = row[5];
    if (/Create|Delete/.test(action)) {
      if (tagObj[tagId] == undefined) {
        tagObj[tagId] = {
          create: {
            parameter: [],
            user_property: []
          },
          remove: {
            parameter: [],
            user_property: []
          }
        };
      }
      if (action == 'Create') {
        tagObj[tagId].create[type].push(buildMapObject(name, value));
      } else if (action == 'Delete') {
        tagObj[tagId].remove[type].push({name: name.toString(), value:value.toString()});
      }
    }
    return tagObj;
  }, []);
}

function removeParams(tagParamList, paramsToDelete) {
  const newList = JSON.parse(JSON.stringify(tagParamList));
  if (paramsToDelete.length > 0) {
    tagParamList.forEach(param => {
      for (let i = 0; i < paramsToDelete.length; i++) {
        const originalParamName = param.map[0].value;
        const originalParamValue = param.map[1].value;
        const paramToDeleteName = paramsToDelete[i].name;
        const paramToDeleteValue = paramsToDelete[i].value;
        if (originalParamName == paramToDeleteName && originalParamValue == paramToDeleteValue) {
          for (let newListIndex = 0; newListIndex < newList.length; newListIndex++) {
            if(newList[newListIndex].map[0].value == paramToDeleteName && newList[newListIndex].map[1].value == paramToDeleteValue) {
              newList.splice(newListIndex, 1);
              break;
            }
          }
          break;
        }
      }
    });
    return newList;
  } else {
    return tagParamList;
  }
}

function generateSuccessfullActionTakenText(paramAndUserPropertySettings) {
  let changes = 'The following has been modified in this tag:';
  if (paramAndUserPropertySettings.create.parameter.length > 0) {
    changes += `
    - Parameters created:`
    paramAndUserPropertySettings.create.parameter.forEach(param => {
      changes += `
        - Name: ${param.map[0].value}, Value: ${param.map[1].value}`
    });
  }
  if (paramAndUserPropertySettings.create.user_property.length > 0) {
    changes += `
    - User Properties created:`
    paramAndUserPropertySettings.create.user_property.forEach(prop => {
      changes += `
        - Name: ${prop.map[0].value}, Value: ${prop.map[1].value}`
    });
  }
  if (paramAndUserPropertySettings.remove.parameter.length > 0) {
    changes += `
    - Parameters removed:`
    paramAndUserPropertySettings.remove.parameter.forEach(param => {
      changes += `
        - Name: ${param.name}, Value: ${param.value}`
    });
  }
  if (paramAndUserPropertySettings.remove.user_property.length > 0) {
    changes += `
    - User Properties removed:`
    paramAndUserPropertySettings.remove.user_property.forEach(prop => {
      changes += `
        - Name: ${prop.name}, Value: ${prop.value}`
    });
  }
  return changes;
}