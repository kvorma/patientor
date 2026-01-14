// zod types
import * as z from "zod";

export enum Rating {
  Healthy = 0,
  LowRisk = 1,
  HighRisk = 2,
  CriticalRisk = 3
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}

export enum Type {
  Hospital = 'Hospital',
  OccupationalHealthcare = 'OccupationalHealthcare',
  HealthCheck = 'HealthCheck'
}
// eslint-disable-next-line
const ZDiagnosis = z.object({
  code: z.string(),
  name: z.string(),
  latin: z.string().optional()
});

export type Diagnosis = z.infer<typeof ZDiagnosis>;

const ZBaseEntry = z.object({
  id: z.string().optional(),
  description: z.string(),
  date: z.iso.date(),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()).optional()
  //  diagnosisCodes: z.array(ZDiagnosis.transform(val => val.code)).optional()
});

const ZHospitalEntry = ZBaseEntry.safeExtend({
  type: z.literal(Type.Hospital),
  discharge: z.object({
    date: z.iso.date(),
    criteria: z.string()
  }).optional()
});

const ZOccupationalHealthcareEntry = ZBaseEntry.safeExtend({
  type: z.literal(Type.OccupationalHealthcare),
  employerName: z.string(),
  sickLeave: z.object({
    startDate: z.iso.date(),
    endDate: z.iso.date()
  }).optional()
});

const ZHealthCheckEntry = ZBaseEntry.safeExtend({
  type: z.literal(Type.HealthCheck),
  healthCheckRating: z.enum(Rating)
});

export const ZEntry = z.discriminatedUnion("type", [
  ZHospitalEntry,
  ZOccupationalHealthcareEntry,
  ZHealthCheckEntry
]);

export const ZPatient = z.object({
  id: z.string().optional(),
  name: z.string(),
  dateOfBirth: z.iso.date('please use ISO format yyyy-mm-dd'),
  ssn: z.string().regex(/^\d{6}.\d{3}.$/, 'malformatted ssn'),
  gender: z.enum(Gender),
  occupation: z.string(),
  entries: z.array(ZEntry).optional()
});

export type Patient = z.infer<typeof ZPatient>;
export type PatientPub = Omit<Patient, 'ssn'>;
export type PatientNew = Omit<Patient, 'entries' | 'id'>;
export type Entry = z.infer<typeof ZEntry>;
