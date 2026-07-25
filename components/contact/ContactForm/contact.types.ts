export interface ContactTopic {
  id: string;

  labelEn: string;
  labelAr: string;

  descriptionEn?: string;
  descriptionAr?: string;

  email: string;
}

export interface ContactFormValues {
  name: string;
  email: string;
  phone: string;
  topic: string;
  message: string;
}