import { INestApplication } from '@nestjs/common';
import { OpenAPIObject } from './interfaces';
import { ModuleRoute } from './interfaces/module-route.interface';
type DenormalizedDoc = Partial<OpenAPIObject> & Record<'root', any>;
export declare class SwaggerTransformer {
    private hasRootKey;
    private hasRootKeyWithVersions;
    private getVersionedPath;
    normalizePaths(denormalizedDoc: DenormalizedDoc[], includeVersions?: string[]): Record<'paths', OpenAPIObject['paths']>;
    unescapeColonsInPath(app: INestApplication, moduleRoutes: ModuleRoute[]): ModuleRoute[];
}
export {};
