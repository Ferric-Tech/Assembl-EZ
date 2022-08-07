export interface ClientData {
  profile: ProfileData;
  leads: LeadData;
  agents: AgentData;
}

export interface ProfileData {
  [key: string]: any;
}

export interface LeadData {
  [key: string]: any;
}

export interface AgentData {
  [key: string]: any;
}

export interface UserRecord {
  disabled: boolean;
  displayName: string;
  email: string;
  emailVerified: boolean;
  phoneNumber: string;
  uid: string;
}
