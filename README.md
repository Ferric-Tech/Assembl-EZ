# Assembl-EZ

## Project structure

The project is broken down as follows:

- Functions (Back end firebase cloud functions)
- Src (Front end Angular for web)

Functions will allows have the index at the core of the fuctions with the underlying endpoints seperated into modules:
Current status of modules and endpoint
|Module|Focus|Endpoints|
|---|---|---|
|client-data|Calling of of the users data at once to load to sessionStorage|- getClientData|
|emails|Emails sent from the platform|- email|
|flags|Flag settings of the user|- updateUserFlags|
|leads|New and current leads of the user|- addLead - editLead|
|users|User profile, New agents, User's Alpha status|- updateUserProfile - addAgent - editAgent - isAlphaUser|

Proposed struture of modules and endpoint
|Module| Focus|Endpoints|
|---|---|---|
|client-data|Calling of of the users data at once to load to sessionStorage|- clientData (to be|
|emails| Emails sent from the platform|- email|
|flags| Flag settings of the user|- flags (to be renamed)|
|leads|New and current leads of the user|- leads (to be combined)|
|users|User profile, New agents, User's Alpha status|- profile (to be renamed) - agents (to be combined)- alphaUser|

Focus of the prposed endpoints
|Endpoint|Focus|Methods|Requires auth|
|---|---|---|---|
|clientData|all of the users data|GET|Yes|
|email|Email as required based on an enum received and the receipiant definded in the body|POST|Yes|
|flags|Update the flags of the user|UPDATE|Yes|
|leads|Add and update leads|- POST - UPDATE|Yes not not for POST (Will be allowed to receive new leads from other sources other then the platform|
|profile|Add and update users profile|- POST - UPDATE|Yes|
|agents|Add and update agents under the users - agents will not be allowed to add agent|- POST - UPDATE|Yes|
|alphaUser|Get the alpha user of the status if for some reason they are added to the al[pha user list, but their isAlphaUser status is not updated|- GET|Yes|
