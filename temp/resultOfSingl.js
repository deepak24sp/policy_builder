[
  {
    updateDisabled: "true",
    rebootAfterUpdate: false,
    autoUpdateAllowedConnectionType:
      "AUTO_UPDATE_CONNECTION_TYPE_ENUM_WIFI_AND_ETHERNET",
    autoUpdateRolloutPlan: {
      plan: "DEFAULT_UPDATES",
      scatter: "SIX_DAYS",
    },
    autoUpdateTimeRestrictions: {
      timeRestriction: [
        {
          start: {
            dayOfWeek: "TUESDAY",
            hours: "6",
            minutes: "15",
          },
          end: "6",
        },
      ],
    },
  },
];
