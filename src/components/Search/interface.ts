export interface citiesInfo {
  title: "string";
  id: "string";
  resultType: "administrativeArea";
  houseNumberType: "PA";
  addressBlockType: "block";
  localityType: "postalCode";
  administrativeAreaType: "county";
  address: {
    label: "string";
    countryCode: "string";
    countryName: "string";
    stateCode: "string";
    state: "string";
    countyCode: "string";
    county: "string";
    city: "string";
    district: "string";
    subdistrict: "string";
    street: "string";
    block: "string";
    subblock: "string";
    postalCode: "string";
    houseNumber: "string";
  };
  position: {
    lat: 0;
    lng: 0;
  };
  access: [
    {
      lat: 0;
      lng: 0;
    }
  ];
  distance: 0;
  mapView: {
    west: 0;
    south: 0;
    east: 0;
    north: 0;
  };
  categories: [
    {
      id: "string";
      name: "string";
      primary: true;
    }
  ];
  foodTypes: [
    {
      id: "string";
      name: "string";
      primary: true;
    }
  ];
  houseNumberFallback: true;
  scoring: {
    queryScore: 0;
    fieldScore: {
      country: 0;
      countryCode: 0;
      state: 0;
      stateCode: 0;
      county: 0;
      countyCode: 0;
      city: 0;
      district: 0;
      subdistrict: 0;
      streets: [0];
      block: 0;
      subblock: 0;
      houseNumber: 0;
      postalCode: 0;
      building: 0;
      unit: 0;
      placeName: 0;
      ontologyName: 0;
    };
  };
  parsing: {
    placeName: [
      {
        start: 0;
        end: 0;
        value: "string";
        qq: "country";
      }
    ];
    country: [
      {
        start: 0;
        end: 0;
        value: "string";
        qq: "country";
      }
    ];
    state: [
      {
        start: 0;
        end: 0;
        value: "string";
        qq: "country";
      }
    ];
    county: [
      {
        start: 0;
        end: 0;
        value: "string";
        qq: "country";
      }
    ];
    city: [
      {
        start: 0;
        end: 0;
        value: "string";
        qq: "country";
      }
    ];
    district: [
      {
        start: 0;
        end: 0;
        value: "string";
        qq: "country";
      }
    ];
    subdistrict: [
      {
        start: 0;
        end: 0;
        value: "string";
        qq: "country";
      }
    ];
    street: [
      {
        start: 0;
        end: 0;
        value: "string";
        qq: "country";
      }
    ];
    block: [
      {
        start: 0;
        end: 0;
        value: "string";
        qq: "country";
      }
    ];
    subblock: [
      {
        start: 0;
        end: 0;
        value: "string";
        qq: "country";
      }
    ];
    houseNumber: [
      {
        start: 0;
        end: 0;
        value: "string";
        qq: "country";
      }
    ];
    postalCode: [
      {
        start: 0;
        end: 0;
        value: "string";
        qq: "country";
      }
    ];
    building: [
      {
        start: 0;
        end: 0;
        value: "string";
        qq: "country";
      }
    ];
    secondaryUnits: [
      {
        start: 0;
        end: 0;
        value: "string";
        qq: "country";
      }
    ];
    ontologyName: [
      {
        start: 0;
        end: 0;
        value: "string";
        qq: "country";
      }
    ];
  };
}

export type suggestedCity = {
  title: string;
  position: {
    lat: number;
    lng: number;
  };
};
