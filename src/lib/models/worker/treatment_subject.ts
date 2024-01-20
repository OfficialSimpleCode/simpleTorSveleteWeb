import Treatment from "../general/treatment_model";

export default class TreatmentSubject {
  name: string = "";
  index: string = "";
  treatments: Map<string, Treatment> = new Map();

  constructor({
    name,
    treatments,
    index,
  }: {
    name: string;
    treatments: Map<string, Treatment>;
    index: string;
  }) {
    this.name = name;
    this.treatments = treatments;
    this.index = index;
  }

  static fromJson(
    json: Record<string, any>,
    newIndex: string,
    {
      pointerShortBookingTime,
      pointerLognestBookingTime,
    }: {
      pointerShortBookingTime?: number[];
      pointerLognestBookingTime?: number[];
    } = {}
  ): TreatmentSubject {
    const name = json["name"] || "";
    const index = newIndex;
    const treatments: Map<string, Treatment> = new Map();

    if (json["treatments"]) {
      Object.entries<Record<string, any>>(json["treatments"]).forEach(
        ([index, treatmentJson]) => {
          treatments.set(index, Treatment.fromJson(treatmentJson, index));

          if (pointerShortBookingTime) {
            if (
              treatments.get(index)!.totalMinutes < pointerShortBookingTime[0]
            ) {
              pointerShortBookingTime[0] = Math.max(
                treatments.get(index)!.times.get("0")!.workMinutes,
                5
              );
            }
            if (
              treatments.get(index)!.totalMinutes === pointerShortBookingTime[0]
            ) {
              pointerShortBookingTime[0] = Math.min(
                Math.max(treatments.get(index)!.times.get("0")!.workMinutes, 5),
                pointerShortBookingTime[0]
              );
            }
          }

          if (pointerLognestBookingTime) {
            if (
              treatments.get(index)!.totalMinutes > pointerLognestBookingTime[0]
            ) {
              pointerLognestBookingTime[0] = Math.max(
                treatments.get(index)!.totalMinutes,
                5
              );
            }
          }
        }
      );
    }

    return new TreatmentSubject({
      name,
      treatments,
      index,
    });
  }

  containTreatment(treatmentId: string): boolean {
    for (const treatment of Object.values(this.treatments)) {
      if (treatment.id === treatmentId) {
        return true;
      }
    }
    return false;
  }

  toJson(): { [key: string]: any } {
    const data: { [key: string]: any } = {};
    data["name"] = this.name;
    data["treatments"] = {};
    Object.entries(this.treatments).forEach(([index, treatment]) => {
      data["treatments"][index] = treatment.toJson();
    });

    return data;
  }

  fromTreatmentSubject(treatmentSubject: TreatmentSubject): TreatmentSubject {
    this.name = treatmentSubject.name;
    this.index = treatmentSubject.index;
    this.treatments = new Map();
    treatmentSubject.treatments.forEach((treatment, index) => {
      this.treatments.set(index, Treatment.fromTreatment(treatment));
    });
    return this;
  }

  //   isEqual(treatmentSubject: TreatmentSubject | null): boolean {
  //     if (treatmentSubject === null) {
  //       return false;
  //     }
  //     let isEqual = true;
  //     isEqual = isEqual && treatmentSubject.name === this.name;
  //     isEqual = isEqual && treatmentSubject.index === this.index;
  //     if (
  //       Object.keys(treatmentSubject.treatments).length !==
  //       Object.keys(this.treatments).length
  //     ) {
  //       return false;
  //     }

  //     Object.entries(treatmentSubject.treatments).forEach(
  //       ([indexTreatment, treatment]) => {
  //         if (this.treatments[indexTreatment] === null) {
  //           isEqual = false;
  //           return;
  //         }
  //         const jsonA = this.treatments[indexTreatment].toJson();
  //         const jsonB = treatment.toJson();
  //         jsonA["index"] = this.treatments[indexTreatment].index;
  //         jsonB["index"] = treatment.index;

  //         if (!DeepCollectionEquality.equals(jsonA, jsonB)) {
  //           isEqual = false;
  //           return;
  //         }
  //       }
  //     );

  //     return isEqual;
  //   }

  toString(): string {
    return JSON.stringify(this.toJson(), null, 2);
  }
}
