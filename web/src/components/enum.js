export const SEVERITY_LEVELS = {
    MODERATE: 101,
    SEVERE: 102    
}

export const QUESTION_TYPES = {
    YES_NO: 100,
    MULTIPLE_CHOICE: 101
}

export const GENDER_TYPES = {
    MALE: "Male",
    FEMALE: "Female",
  };
  
  export const STATUS_TYPES = {
    ACTIVE: "Active",
    INACTIVE: "Inactive",
  };

  export const STATUS = {
    ACTIVE: 100,
    INACTIVE: 101
  }
  
  export const MARTIAL_STATUS_TYPES = {
    SINGLE: 100,
    MARRIED: 101,
  }
  export const CAN_SPEAK={
    AMHARIC:100,
    ENGLISH:101,
    OROMIFA:102,
    OTHER:103,
  }
  export const MEANS_OF_TRANSPORT_TYPES = {
    CAR: 100,
    MOTORBIKE: 101,
    BICYCLE: 102,
    AMBULANCE: 104,
    WALKING: 105,
    OTHER: 106,
  };

  export const HEALTH_PROFESSIONS = {
    DOCTOR: 100,
    NURSE: 101,
    PHARMACIST: 102,
    PARAMEDIC: 103,
    EMT: 104,
    ANESTETHETIST: 105,
    LAY_RESPONDER: 106,
    STUDENT: 107,
    DRIVER: 108
}

  export const DISABILITY = {
    YES: 100,
    NO: 101
  }

  export const ATTACHMENT_TYPES = {
    NATIONAL_ID: 100,
    PASSPORT: 101,
    DRIVER_LICENSE: 102,
    PROFFESIONAL_LICENSE: 103,
    DRIVER_IMAGE: 104,
    EMPLOYMENT_ID: 105,
    STUDENT_ID: 106,
    RECENT_PHOTO: 107,
    PROFESSIONAL_LICENSE: 108,
    PROFESSIONAL_CERTIFICATE: 109,
    TRADE_LICENSE: 110,
    LETTER_OF_WARRANTY: 111,
    CAR_OWNERSHIP: 112,
    OTHER: 113
  }

  export const PROVIDER_POSITIONS = {
    FIRST_RESPONDER: 100,
    AMBULANCE_PROVIDER: 101,
    RIDE_PROVIDER: 102,
    HOMECARE_PROVIDER: 103,
  }

   export const INCIDENT_TYPE = {
    MEDICAL_EMERGENCY: 100,
    TRAUMA: 101,
    MATERNAL_EMERGENCY: 102,
    CHILD_EMERGENCY: 103,
    OTHER: 104
}
 export const TREATMENT_TYPES = {
    CPR: 100,
    AIRWAY_OPENING: 101,
    BLEEDING_MANAGEMENT: 103,
    IMMOBILIZATION: 106,
    POSITIONING_REASSURANCE: 107,
    DELIVERY: 108,
    TRANSPORTING: 109,
    ALS_INTERVENTIONS: 110,
    OTHER: 111
}

export const Gender = {
  MALE : 101,
  FEMALE: 102
}
export const getIncidentTypeText = (type) => {
  const incidentTypeMap = {
    [INCIDENT_TYPE.MEDICAL_EMERGENCY]: "Medical Emergency",
    [INCIDENT_TYPE.TRAUMA]: "Trauma",
    [INCIDENT_TYPE.MATERNAL_EMERGENCY]: "Maternal Emergency",
    [INCIDENT_TYPE.CHILD_EMERGENCY]: "Child Emergency",
    [INCIDENT_TYPE.OTHER]: "Other",
  };
  return incidentTypeMap[type] || "Unknown";
};

export const getTreatmentTypeText = (type) => {
  const treatmentTypeMap = {
    [TREATMENT_TYPES.CPR]: "CPR",
    [TREATMENT_TYPES.AIRWAY_OPENING]: "Airway Opening",
    [TREATMENT_TYPES.BLEEDING_MANAGEMENT]: "Bleeding Management",
    [TREATMENT_TYPES.IMMOBILIZATION]: "Immobilization",
    [TREATMENT_TYPES.POSITIONING_REASSURANCE]: "Positioning & Reassurance",
    [TREATMENT_TYPES.DELIVERY]: "Delivery",
    [TREATMENT_TYPES.TRANSPORTING]: "Transporting",
    [TREATMENT_TYPES.ALS_INTERVENTIONS]: "ALS Interventions",
    [TREATMENT_TYPES.OTHER]: "Other",
  };
  return treatmentTypeMap[type] || "Unknown";
};
export const HOSPITAL_CLASSIFICATIONS = {
  PUBLIC: 100,
  PRIVATE: 101
};

export const getHospitalClassificationText = (classification) => {
  switch (classification) {
      case HOSPITAL_CLASSIFICATIONS.PUBLIC:
          return "Public";
      case HOSPITAL_CLASSIFICATIONS.PRIVATE:
          return "Private";
      default:
          return "Unknown";
  }
};

export const getSeverityText = (severity) => {
  switch (severity) {
      case SEVERITY_LEVELS.SEVERE:
          return "Severe";
      case SEVERITY_LEVELS.MODERATE:
          return "Moderate";
      default:
          return "Unknown";
  }
};

export const getGenderText = (gender) => {
  return gender === 101 ? "Male" : gender === 102 ? "Female" : "Unknown";
};