// zod types
import * as z from "zod";

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}
export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}

const ZDiagnosis = z.object({
  code: z.string(),
  name: z.string(),
  latin: z.string().optional()
})

export type Diagnosis = z.infer<typeof ZDiagnosis>

const ZBaseEntry = z.object({
  id: z.string(),
  description: z.string(),
  date: z.iso.date(),
  specialist: z.string(),
  diagnosisCodes: z.array(ZDiagnosis.transform(val => val.code)).optional()
})

const ZHospitalEntry = ZBaseEntry.safeExtend({
  type: z.literal('Hospital'),
  discharge: z.object({
    date: z.iso.date(),
    criteria: z.string()
  })
})

const ZOccupationalHealthcareEntry = ZBaseEntry.safeExtend({
  type: z.literal('OccupationalHealthcare'),
  employerName: z.string(),
  sickLeave: z.object({
    startDate: z.iso.date(),
    endDate: z.iso.date()
  }).optional()
})

const ZHealthCheckEntry = ZBaseEntry.safeExtend({
  type: z.literal('HealthCheck'),
  healthCheckRating: z.enum(HealthCheckRating)
})

const ZEntry = z.union([
  ZHospitalEntry,
  ZOccupationalHealthcareEntry,
  ZHealthCheckEntry
])

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
