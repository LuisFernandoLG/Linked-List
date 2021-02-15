export default class Validator {
    async isPositiveNumber(value) {
        return new Promise((resolve, reject) => {
            const validation = /^\d+$/;
            if (validation.test(value)) resolve(value);
            else reject("Invalid input");
        });
    }

    async isNumber(value) {
        return new Promise((resolve, reject) => {
            const validation = /^\-*\d+$/;
            if (validation.test(value)) resolve(value);
            else reject("Invalid input");
        });
    }
}
