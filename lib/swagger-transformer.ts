import { INestApplication } from '@nestjs/common';
import { VERSION_NEUTRAL } from '@nestjs/common/interfaces/version-options.interface';
import { VersioningType } from '@nestjs/common/enums/version-type.enum';
import { filter, groupBy, keyBy, mapValues, omit } from 'lodash';
import { OpenAPIObject } from './interfaces';
import { ModuleRoute } from './interfaces/module-route.interface';
import { sortObjectLexicographically } from './utils/sort-object-lexicographically';

export class SwaggerTransformer {
  public normalizePaths(
    denormalizedDoc: (Partial<OpenAPIObject> & Record<'root', any>)[],
    includeVersions: Array<string> = undefined,
  ): Record<'paths', OpenAPIObject['paths']> {
    const roots = filter(
      denormalizedDoc,
      includeVersions
      ? (r) => r.root && (!r.root.version || r.root.version === VERSION_NEUTRAL || includeVersions.some(v => v === r.root.version))
      : (r) => r.root
    );
    const groupedByPath = groupBy(roots, ({ root }: Record<'root', any>) =>
      root.versionType.type === VersioningType.HEADER &&
        root.version &&
        root.version !== VERSION_NEUTRAL &&
        (!includeVersions || includeVersions.length > 1)
        ? `${root.path} version:${root.version}`
        : root.path
    );
    const paths = mapValues(groupedByPath, (routes) => {
      const keyByMethod = keyBy(
        routes,
        ({ root }: Record<'root', any>) => root.method
      );
      return mapValues(keyByMethod, (route: any) => {
        const mergedDefinition = {
          ...omit(route, 'root'),
          ...omit(route.root, ['method', 'path', 'versionType', 'version'])
        };
        return sortObjectLexicographically(mergedDefinition);
      });
    });
    return {
      paths
    };
  }

  public unescapeColonsInPath(
    app: INestApplication,
    moduleRoutes: ModuleRoute[]
  ): ModuleRoute[] {
    const httpAdapter = app.getHttpAdapter();
    const usingFastify = httpAdapter && httpAdapter.getType() === 'fastify';
    const unescapeColon = usingFastify
      ? (path: string) => path.replace(/:\{([^}]+)\}/g, ':$1')
      : (path: string) => path.replace(/\[:\]/g, ':');

    return moduleRoutes.map((moduleRoute) => ({
      ...moduleRoute,
      root: {
        ...moduleRoute.root,
        path: unescapeColon(moduleRoute.root.path)
      }
    }));
  }
}
