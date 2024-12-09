import { Type } from '@nestjs/common';
import { BaseParameterObject, ParameterObject, ReferenceObject, SchemaObject } from '../interfaces/open-api-spec.interface';
import { SchemaObjectMetadata } from '../interfaces/schema-object-metadata.interface';
import { ModelPropertiesAccessor } from './model-properties-accessor';
import { ParamWithTypeMetadata } from './parameter-metadata-accessor';
import { SwaggerTypesMapper } from './swagger-types-mapper';
export declare class SchemaObjectFactory {
    private readonly modelPropertiesAccessor;
    private readonly swaggerTypesMapper;
    constructor(modelPropertiesAccessor: ModelPropertiesAccessor, swaggerTypesMapper: SwaggerTypesMapper);
    createFromModel(parameters: ParamWithTypeMetadata[], schemas: Record<string, SchemaObject>): Array<ParamWithTypeMetadata | BaseParameterObject>;
    getCustomType(param: ParamWithTypeMetadata, schemas: Record<string, SchemaObject>): {
        name: string | number | object;
        schema: {
            type: string;
            items: {
                $ref: string;
                nullable?: boolean;
                discriminator?: import("../interfaces/open-api-spec.interface").DiscriminatorObject;
                readOnly?: boolean;
                writeOnly?: boolean;
                xml?: import("../interfaces/open-api-spec.interface").XmlObject;
                externalDocs?: import("../interfaces/open-api-spec.interface").ExternalDocumentationObject;
                example?: any;
                examples?: any[] | Record<string, any>;
                deprecated?: boolean;
                type?: string;
                allOf?: (SchemaObject | ReferenceObject)[];
                oneOf?: (SchemaObject | ReferenceObject)[];
                anyOf?: (SchemaObject | ReferenceObject)[];
                not?: SchemaObject | ReferenceObject;
                items?: SchemaObject | ReferenceObject;
                properties?: Record<string, SchemaObject | ReferenceObject>;
                additionalProperties?: SchemaObject | ReferenceObject | boolean;
                patternProperties?: SchemaObject | ReferenceObject | any;
                description?: string;
                format?: string;
                default?: any;
                title?: string;
                multipleOf?: number;
                maximum?: number;
                exclusiveMaximum?: boolean;
                minimum?: number;
                exclusiveMinimum?: boolean;
                maxLength?: number;
                minLength?: number;
                pattern?: string;
                maxItems?: number;
                minItems?: number;
                uniqueItems?: boolean;
                maxProperties?: number;
                minProperties?: number;
                required?: string[];
                enum?: any[];
            } | {
                $ref: string;
            };
        };
        type?: Type<unknown>;
        in?: import("../interfaces/open-api-spec.interface").ParameterLocation | "body" | "placeholder";
        isArray?: boolean;
        items?: SchemaObject;
        required: true;
        enum?: unknown[];
        enumName?: string;
        enumSchema?: import("../interfaces/enum-schema-attributes.interface").EnumSchemaAttributes;
    } | {
        name: string | number | object;
        schema: {
            $ref: string;
            nullable?: boolean;
            discriminator?: import("../interfaces/open-api-spec.interface").DiscriminatorObject;
            readOnly?: boolean;
            writeOnly?: boolean;
            xml?: import("../interfaces/open-api-spec.interface").XmlObject;
            externalDocs?: import("../interfaces/open-api-spec.interface").ExternalDocumentationObject;
            example?: any;
            examples?: any[] | Record<string, any>;
            deprecated?: boolean;
            type?: string;
            allOf?: (SchemaObject | ReferenceObject)[];
            oneOf?: (SchemaObject | ReferenceObject)[];
            anyOf?: (SchemaObject | ReferenceObject)[];
            not?: SchemaObject | ReferenceObject;
            items?: SchemaObject | ReferenceObject;
            properties?: Record<string, SchemaObject | ReferenceObject>;
            additionalProperties?: SchemaObject | ReferenceObject | boolean;
            patternProperties?: SchemaObject | ReferenceObject | any;
            description?: string;
            format?: string;
            default?: any;
            title?: string;
            multipleOf?: number;
            maximum?: number;
            exclusiveMaximum?: boolean;
            minimum?: number;
            exclusiveMinimum?: boolean;
            maxLength?: number;
            minLength?: number;
            pattern?: string;
            maxItems?: number;
            minItems?: number;
            uniqueItems?: boolean;
            maxProperties?: number;
            minProperties?: number;
            required?: string[];
            enum?: any[];
        } | {
            $ref: string;
        };
        type?: Type<unknown>;
        in?: import("../interfaces/open-api-spec.interface").ParameterLocation | "body" | "placeholder";
        isArray?: boolean;
        items?: SchemaObject;
        required: true;
        enum?: unknown[];
        enumName?: string;
        enumSchema?: import("../interfaces/enum-schema-attributes.interface").EnumSchemaAttributes;
    };
    private createQueryOrParamSchema;
    extractPropertiesFromType(type: Type<unknown>, schemas: Record<string, SchemaObject>, pendingSchemasRefs?: string[]): ParameterObject[];
    exploreModelSchema(type: Type<unknown> | Function, schemas: Record<string, SchemaObject>, pendingSchemasRefs?: string[]): string;
    getSchemaMetadata(type: Function | Type<unknown>): {
        schemaName: string;
        schemaProperties: {
            description?: string;
        };
    };
    mergePropertyWithMetadata(key: string, prototype: Type<unknown>, schemas: Record<string, SchemaObject>, pendingSchemaRefs: string[], metadata?: SchemaObjectMetadata): SchemaObjectMetadata | ReferenceObject | ParameterObject | (SchemaObject & {
        selfRequired?: boolean;
    });
    createEnumParam(param: ParamWithTypeMetadata & BaseParameterObject, schemas: Record<string, SchemaObject>): Partial<ParamWithTypeMetadata & BaseParameterObject>;
    createEnumSchemaType(key: string, metadata: SchemaObjectMetadata, schemas: Record<string, SchemaObject>): SchemaObjectMetadata;
    createNotBuiltInTypeReference(key: string, metadata: SchemaObjectMetadata, trueMetadataType: unknown, schemas: Record<string, SchemaObject>, pendingSchemaRefs: string[]): SchemaObjectMetadata;
    transformToArraySchemaProperty(metadata: SchemaObjectMetadata, key: string, type: string | Record<string, any>): SchemaObjectMetadata;
    mapArrayCtorParam(param: ParamWithTypeMetadata): any;
    createFromObjectLiteral(key: string, literalObj: Record<string, any>, schemas: Record<string, SchemaObject>): {
        name: string;
        type: string;
        properties: {};
        required: any[];
    };
    createFromNestedArray(key: string, metadata: SchemaObjectMetadata, schemas: Record<string, SchemaObject>, pendingSchemaRefs: string[]): any;
    private createSchemaMetadata;
    private isArrayCtor;
    private isPrimitiveType;
    private isLazyTypeFunc;
    private getTypeName;
    private isObjectLiteral;
    private isBigInt;
    private extractPropertyModifiers;
}
