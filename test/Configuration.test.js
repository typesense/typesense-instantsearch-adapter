import { Configuration } from "../src/Configuration";

describe("Configuration", () => {
  describe("constructor", () => {
    describe("union parameter", () => {
      it("defaults union to false when not provided", () => {
        const subject = new Configuration({});
        expect(subject.union).toBe(false);
      });

      it("sets union to true when explicitly provided", () => {
        const subject = new Configuration({
          union: true,
          additionalSearchParameters: {
            query_by: "name",
          },
        });
        expect(subject.union).toBe(true);
      });

      it("sets union to false when explicitly provided as false", () => {
        const subject = new Configuration({
          union: false,
          additionalSearchParameters: {
            query_by: "name",
          },
        });
        expect(subject.union).toBe(false);
      });

      it("handles truthy values for union", () => {
        const subject = new Configuration({
          union: "true",
          additionalSearchParameters: {
            query_by: "name",
          },
        });
        expect(subject.union).toBe("true");
      });
    });

    describe("flipNegativeRefinementOperator parameter", () => {
      it("defaults flipNegativeRefinementOperator to false when not provided", () => {
        const subject = new Configuration({});
        expect(subject.flipNegativeRefinementOperator).toBe(false);
      });

      it("sets flipNegativeRefinementOperator to true when explicitly provided", () => {
        const subject = new Configuration({
          flipNegativeRefinementOperator: true,
        });
        expect(subject.flipNegativeRefinementOperator).toBe(true);
      });
    });
  });

  describe(".validate", () => {
    describe("using query_by", () => {
      it("throws an error if query_by or preset is not set anywhere", () => {
        const subject = new Configuration({});

        expect(() => {
          subject.validate();
        }).toThrow(/Missing parameter/);
      });
      it("does not throw an error if query_by is set in additionalSearchParameters", () => {
        const subject = new Configuration({
          additionalSearchParameters: {
            query_by: "name",
          },
        });

        expect(() => {
          subject.validate();
        }).not.toThrow();
      });
      it("throws an error if query_by is not set in all collectionSpecificSearchParameters", () => {
        const subject = new Configuration({
          collectionSpecificSearchParameters: {
            collection1: {},
            collection2: {
              query_by: "name",
            },
          },
        });

        expect(() => {
          subject.validate();
        }).toThrow(/Missing parameter/);
      });
      it("does not throw an error if query_by set in all collectionSpecificSearchParameters", () => {
        const subject = new Configuration({
          collectionSpecificSearchParameters: {
            collection1: {
              query_by: "title",
            },
            collection2: {
              query_by: "name",
            },
          },
        });

        expect(() => {
          subject.validate();
        }).not.toThrow();
      });
      it("does not throw an error if preset is set in additionalSearchParameters", () => {
        const subject = new Configuration({
          additionalSearchParameters: {
            preset: "listing_view",
          },
        });

        expect(() => {
          subject.validate();
        }).not.toThrow();
      });
      it("throws an error if preset is not set in all collectionSpecificSearchParameters", () => {
        const subject = new Configuration({
          collectionSpecificSearchParameters: {
            collection1: {
              preset: "listing_view_1",
            },
            collection2: {},
          },
        });

        expect(() => {
          subject.validate();
        }).toThrow(/Missing parameter/);
      });
      it("does not throw an error if preset or query_by is set in all collectionSpecificSearchParameters", () => {
        const subject = new Configuration({
          collectionSpecificSearchParameters: {
            collection1: {
              preset: "listing_view_1",
            },
            collection2: {
              query_by: "name",
            },
          },
        });

        expect(() => {
          subject.validate();
        }).not.toThrow();
      });
      it("does not throw an error if preset is set in all collectionSpecificSearchParameters", () => {
        const subject = new Configuration({
          collectionSpecificSearchParameters: {
            collection1: {
              preset: "listing_view_1",
            },
            collection2: {
              preset: "listing_view_2",
            },
          },
        });

        expect(() => {
          subject.validate();
        }).not.toThrow();
      });
    });
    describe("using queryBy", () => {
      it("does not throw an error if queryBy is set in additionalSearchParameters, but it logs a warning", () => {
        const subject = new Configuration({
          additionalSearchParameters: {
            queryBy: "name",
          },
        });

        const consoleWarnMock = jest.spyOn(console, "warn").mockImplementation();

        expect(() => {
          subject.validate();
        }).not.toThrow();

        expect(consoleWarnMock).toHaveBeenCalledTimes(1);
        expect(consoleWarnMock).toHaveBeenLastCalledWith(
          expect.stringContaining("Please use snake_cased versions of parameters"),
        );
        consoleWarnMock.mockRestore();
      });
      it("throws an error if queryBy is not set in all collectionSpecificSearchParameters, and it logs a warning", () => {
        const subject = new Configuration({
          collectionSpecificSearchParameters: {
            collection1: {},
            collection2: {
              queryBy: "name",
            },
          },
        });

        const consoleWarnMock = jest.spyOn(console, "warn").mockImplementation();
        expect(() => {
          subject.validate();
        }).toThrow(/Missing parameter/);

        expect(consoleWarnMock).toHaveBeenCalledTimes(1);
        expect(consoleWarnMock).toHaveBeenLastCalledWith(
          expect.stringContaining("Please use snake_cased versions of parameters"),
        );
        consoleWarnMock.mockRestore();
      });
      it("does not throw an error if queryBy set in all collectionSpecificSearchParameters, but it logs a warning", () => {
        const subject = new Configuration({
          collectionSpecificSearchParameters: {
            collection1: {
              queryBy: "title",
            },
            collection2: {
              queryBy: "name",
            },
          },
        });

        const consoleWarnMock = jest.spyOn(console, "warn").mockImplementation();
        expect(() => {
          subject.validate();
        }).not.toThrow();
        expect(consoleWarnMock).toHaveBeenCalledTimes(1);
        expect(consoleWarnMock).toHaveBeenLastCalledWith(
          expect.stringContaining("Please use snake_cased versions of parameters"),
        );
        consoleWarnMock.mockRestore();
      });
    });
  });
});
