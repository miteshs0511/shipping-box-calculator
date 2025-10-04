export type Country = 'Sweden' | 'China' | 'Brazil' | 'Australia';

export interface Box {
  id: string;
  receiverName: string;
  weight: number;
  boxColor: string;
  destinationCountry: Country;
  shippingCost: number;
}
