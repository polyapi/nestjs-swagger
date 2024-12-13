import { Type } from '@nestjs/common';
import { SchemaObject } from '../interfaces/open-api-spec.interface';
import { FactoriesNeededByResponseFactory } from '../services/response-object-factory';
export declare const exploreGlobalApiResponseMetadata: (schemas: Record<string, SchemaObject>, metatype: Type<unknown>, factories: FactoriesNeededByResponseFactory) => {
    responses: {
        [x: number]: Pick<Record<string, any>, string>;
    };
};
export declare const exploreApiResponseMetadata: (schemas: Record<string, SchemaObject>, factories: FactoriesNeededByResponseFactory, instance: object, prototype: Type<unknown>, method: Function) => {
    [x: number]: Pick<Record<string, any>, string>;
};