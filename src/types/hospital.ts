// types/hospital.ts
export type HospitalInfo = {
  treatment_type: string;
  hospital_id: string;
  hospital_name: string;
  hospital_address: string;
  city: string;
  state: string;
  lat: number;
  lon: number;
  phone: string;
  utilization: number;
  avg_cost: number;
  total_cases: number;
  treatment_name: string;
};

export type SortType = "utilization" | "cost";
