export interface Guest {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  uniqueCode: string;
  isCheckedIn: boolean;
  registeredAt: Date;
  checkedInAt?: Date;
}

export interface RegistrationFormData {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
}

export interface CheckInFormData {
  uniqueCode: string;
}
