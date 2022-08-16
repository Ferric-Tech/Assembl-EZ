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
|client-data|Calling of of the users data at once to load to sessionStorage|<li>clientData (to be renamed)</li>|
|emails| Emails sent from the platform|<li>email</li>|
|flags| Flag settings of the user|<li>flags (to be renamed)</li>|
|leads|New and current leads of the user|<li>leads (to be combined)</li>|
|users|User profile, New agents, User's Alpha status|<li>profile (to be renamed)</li> <li>agents (to be combined)</li><li>alphaUser</li>|

Focus of the proposed endpoints
|Endpoint|Focus|Methods &nbsp;|Requires auth|
|---|---|---|---|
|clientData|all of the users data|<li>GET</li>|Yes|
|email|Email as required based on an enum received and the receipiant definded in the body|<li>POST</li>|Yes|
|flags|Update the flags of the user|<li>UPDATE</li>|Yes|
|leads|Add and update leads|<li>POST</li><li>UPDATE</li>|Yes but not for POST (will be allowed to receive new leads from other sources other then the platform|
|profile|Add and update users profile|<li>POST</li><li>UPDATE</li>|Yes|
|agents|Add and update agents under the users - agents will not be allowed to add agent|<li>POST</li><li>UPDATE</li>|Yes|
|alphaUser|Get the alpha user of the status if for some reason they are added to the alpha user list, but their isAlphaUser status is not updated|<li>GET</li>|Yes|
