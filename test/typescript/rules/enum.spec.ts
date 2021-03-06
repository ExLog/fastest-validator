/// <reference path="../../../index.d.ts" /> // here we make a reference to exists module definition
import ValidatorType, { RuleEnum } from 'fastest-validator'; // here we importing type definition of default export

const Validator: typeof ValidatorType = require('../../../index'); // here we importing real Validator Constructor
const v: ValidatorType = new Validator();

describe('TypeScript Definitions', () => {
    describe('Test rule: enum', () => {

        it('check enum', () => {
            const check = v.compile({ $$root: true, type: 'enum', values: ['male', 'female'] } as RuleEnum);

            expect(check('')).
                toEqual([{ type: 'enumValue', expected: 'male, female', actual: '', message: 'The \'\' field value \'male, female\' does not match any of the allowed values.' }]);
            expect(check('human')).
                toEqual([{ type: 'enumValue', expected: 'male, female', actual: 'human', message: 'The \'\' field value \'male, female\' does not match any of the allowed values.' }]);
            expect(check('male')).toEqual(true);
            expect(check('female')).toEqual(true);
        });

        it('check enum', () => {
            const check = v.compile({ $$root: true, type: 'enum', values: [null, 1, 2, 'done', false] } as RuleEnum);

            expect(check('male')).
                toEqual([
                    {
                        type: 'enumValue',
                        expected: ', 1, 2, done, false',
                        actual: 'male',
                        message: 'The \'\' field value \', 1, 2, done, false\' does not match any of the allowed values.',
                    }]);
            expect(check(2)).toEqual(true);
            expect(check('done')).toEqual(true);
            expect(check(false)).toEqual(true);
        });
    });
});
