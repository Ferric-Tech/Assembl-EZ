export interface ClientData {
  profile: { userInfo: UserInfo; flags: FlagData };
  leads: LeadData;
  agents: AgentData;
}

export interface UserInfo {
  // Personal details
  firstName: string;
  lastName: string;
  email: string;
  contactNumber: string;

  // Business details
  entityType: string;
  tradingName: string;

  // Contact details
  isPrimaryContact: boolean;
  companyContactNumber: string;
  companyEmail: string;
  companyWebsite: string;

  // User settings
  agentDefaultPassword: string;
  principleAccount: string;
  isAlphaUser: boolean;
}

export interface LeadData {
  [key: string]: any;
}

export interface AgentData {
  [key: string]: any;
}

export interface FlagData {
  products: boolean;
}

export interface UserRecord {
  disabled: boolean;
  displayName: string;
  email: string;
  emailVerified: boolean;
  phoneNumber: string;
  uid: string;
}
