## GA4 Google Tag Manager Utilities

This is not an officially supported Google product.

This repository contains an Apps Script that can be used in combination with a Google Spreadsheet to modify and list various Google Analytics 4 Tag Manager settings.

The script makes use of the following APIs:



*   Google Tag Manager API
    *   Subject to [normal limitations](https://developers.google.com/tag-platform/tag-manager/api/v2/limits-quotas)

The script currently performs the following functions:



*   Existing Parameters and User Properties
    *   List, Create, Delete


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


## Feedback

If you have feedback or notice bugs, please feel free to raise an issue in GitHub, post in the group, or submit a response to [this survey](https://docs.google.com/forms/d/e/1FAIpQLScHrZbNU2RZGMtcWTVVEsxe5ZzARFvjqFQziixNPUPCsNcUUQ/viewform). Please note that this is not an officially supported Google product, so support is not guaranteed.
