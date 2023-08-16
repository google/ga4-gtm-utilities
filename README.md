## GA4 Google Tag Manager Utilities

This is not an officially supported Google product.

This repository contains an Apps Script that can be used in combination with a Google Spreadsheet to modify and list various Tag Manager settings.

The script currently performs the following functions:

| Sheet Name                                                                               | Description                                                       
|------------------------------------------------------------------------------------------|-------------------------------------------
| [Modify Parameter or User Property Settings](#existing-parameters-and-user-properties)   | List all parameters and user properties across GA4 tags in a workspace. Create and remove parameters and user properties in GA4 event tags.
| [Event Tag Settings](#event-tag-settings)                                                | Edit nearly all settings for GA4 event tags.
| [Variable Usage](#variable-usage)                                                        | List variables, detec usage in other variables, tags, and trigges. Delete variables.

## APIs

The script makes use of the following APIs:

*   Google Tag Manager API
    *   Subject to [normal limitations](https://developers.google.com/tag-platform/tag-manager/api/v2/limits-quotas)

## How to Access the Spreadsheet

It is strongly recommended that you use the template spreadsheet to use the GA4 GTM Utilities script. Follow these steps to make a copy of the template spreadsheet and start using the script:

1. Join [this group](https://groups.google.com/g/ga4-gtm-utilities-users) to gain access to the spreadsheet.
2. Create a copy of [this spreadsheet](https://docs.google.com/spreadsheets/d/1yZVgAlMJbCpZDyimdj0h4QHQbogLJZv83oXqRwT-A40/edit?resourcekey=0-aZ7q7_HASW9TZpFbquEZsw#gid=515466659).

If you are not copying the template sheet, then the Google Tag Manager API services need to be enabled in the sheet you create.

## Utilities

For all of the following activities, you will need to go through the following steps first:

1. Select the workspace you want to migrate
    1. Click GA4 GTM Utilities > GTM Workspace Selection > List GTM Accounts.
    2. Select an account.
    3. Click GA4 GTM Utilities > GTM Workspace Selection > List GTM Containers.
    4. Select a container.
    5. Click GA4 GTM Utilities > GTM Workspace Selection > List GTM Workspaces.
    6. Select a workspace. When you select a workspace, the workspace should turn green.
2. (Optional) If you want a dropdown list of your GTM variables when asked to input values, then click GA4 GTM Utilities > (Optional) GTM Variables > Add GTM Variable Dropdown List. All variables (including built-in variables) in your workspace will be added to the validation sheet and a dropdown list will become available in various parts of the spreadsheet. 
    7. NOTE: You can either select a variable from the dropdown or enter any other value you want, so please ignore the warning message where the variable dropdown list is present.

### Existing Parameters and User Properties

#### List Existing Parameters and User Properties

1. Select your GTM workspace.
2. Navigate to the “Modify Parameter or User Property Settings” sheet.
3. Click on GA4 GTM Utilities > Parameters and User Properties > List Existing Parameters and User Properties.
4. The script will save all parameters and user property settings found across all GA4 event tags found in the workspace to the sheet.

Listing all of the existing parameters and user properties is useful when you want to delete a large number of existing settings or you want to copy existing settings across tags.

#### List Existing GA4 Event Tags

1. Select your GTM workspace.
2. Navigate to the “Modify Parameter or User Property Settings” sheet.
3. Click on GA4 GTM Utilities > Parameters and User Properties > List Existing GA4 Tags.
4. The script will save each existing GA4 tag in a workspace as a separate row in the sheet.

Listing all of the existing GA4 event tags in a workspace is useful when you want to create new parameter or user property settings for tags and don’t need to modify existing settings.

#### Delete Existing Parameters and User Properties

1. Select your GTM workspace.
2. Navigate to the “Modify Parameter or User Property Settings” sheet.
3. Click on GA4 GTM Utilities > Parameters and User Properties > List Existing GA4 Tags.
4. Set the “Action” column to “Delete” for each parameter or user property you want to delete.
5. Click on GA4 GTM Utilities > Parameters and User Properties > Modify Parameters and User Properties.
6. The script will update the existing tags and remove the specified settings.

#### Create Parameters and User Properties

1. Select your GTM workspace.
2. Navigate to the “Modify Parameter or User Property Settings” sheet.
3. Enter the necessary settings to create a new parameter or user property:
    1. Columns B - E must have values for a parameter or user property to be successfully created.
    2. (optional): Click on GA4 GTM Utilities > Parameters and User Properties > List Existing GA4 Tags to get a list of existing settings to use as templates for new settings.
    3. (optional): Click on GA4 GTM Utilities > Parameters and User Properties > List Existing GA4 Tags to get a list of all of the GA4 event tags in your workspace and provide the tag ID value.
4. Set the “Action” column to “Create” for each parameter or user property you want to create.
5. Click on GA4 GTM Utilities > Parameters and User Properties > Modify Parameters and User Properties.
6. The script will update the existing tags and create the specified settings.

#### Update Existing Parameters and User Properties

The script does not have a direct way of updating existing parameters or user properties. To achieve the same result, you should list all of the parameters or user properties in your workspace, set the ones that need to be updated to “Delete”, and create new parameters or use properties with the updated settings.

## Event Tag Settings

### List GA4 Event Tags

1. Select your GTM workspace.
2. Navigate to the “Event Tag Settings” sheet.
3. Click on GA4 GTM Utilities > Event Tags > List GA4 Event Tags.
4. The script will attempt to list all of the GA4 event tags and their various settings in the Event Tag Settings sheet.

### Create GA4 Event Tags

It is recommended to click GA4 GTM Utilities > (Optional) GTM Variables > Add GTM Variable Dropdown List Itams so that any variables in your workspace will appear as values that can be selected in various dropdowns in the sheet.

1. Select your GTM workspace in the "GTM Workspace" sheet.
2. In a blank row, enter the tag name and any additional information. Please note that for Firing Trigger IDs and Blocking Trigger Ids, the trigger names can be provided in a comma separate list to be added to the tag.
3. Check the "Create" box.
4. Click on GA4 GTM Utilities > Event Tags > Modify GA4 Event Tags.
5. The script will attempt to create the tags and log any changes in the "Changelog" sheet.

### Update GA4 Event Tags

It is recommended to click GA4 GTM Utilities > (Optional) GTM Variables > Add GTM Variable Dropdown List Itams so that any variables in your workspace will appear as values that can be selected in various dropdowns in the sheet.

1. Select your GTM workspace in the "GTM Workspace" sheet.
2. List your existing GA4 event tags.
3. Edit the settings for the tags you want to update.
4. Check the "Update" box for each event you want to update.
5. Click on GA4 GTM Utilities > Event Tags > Modify GA4 Event Tags.
6. The script will attempt to update the tags and log any changes in the "Changelog" sheet.

### Delete GA4 Event Tags

1. Select your GTM workspace in the "GTM Workspace" sheet.
2. List your existing GA4 event tags.
3. Check the "Delete" box for each event you want to delete.
4. Click on GA4 GTM Utilities > Event Tags > Modify GA4 Event Tags.
5. The script will attempt to delete the tags and log any changes in the "Changelog" sheet.

## Variable Usage

### List Variables

1. Select your GTM workspace.
2. Navigate to the “Variable Usage” sheet.
3. Click on GA4 GTM Utilities > Variable Usage > List.
4. The script will attempt to list all of the variables in the selected workspace in the "Variable Usage" sheet. For each variable, the script will check if it can be found in any of the triggers, tags, or other variables in the workspace.

### Delete Variables

1. Select your GTM workspace in the "GTM Workspace" sheet.
2. Navigate to the "Variable Usage Sheet".
3. List your variables.
4. Check the "Delete" box for each variable you want to delete.
5. Click on GA4 GTM Utilities > Variable Usage > Delete.
6. The script will attempt to delete the variables and log any changes in the "Changelog" sheet.


## Feedback

If you have feedback or notice bugs, please feel free to raise an issue in GitHub, post in the group, or submit a response to [this survey](https://docs.google.com/forms/d/e/1FAIpQLScHrZbNU2RZGMtcWTVVEsxe5ZzARFvjqFQziixNPUPCsNcUUQ/viewform). Please note that this is not an officially supported Google product, so support is not guaranteed.
