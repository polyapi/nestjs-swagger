import { INestApplication } from '@nestjs/common';
import { VERSION_NEUTRAL } from '@nestjs/common/interfaces/version-options.interface';
import { VersioningType } from '@nestjs/common/enums/version-type.enum';
import { filter, groupBy, keyBy, mapValues, omit } from 'lodash';
import { OpenAPIObject } from './interfaces';
import { ModuleRoute } from './interfaces/module-route.interface';
import { sortObjectLexicographically } from './utils/sort-object-lexicographically';

export class SwaggerTransformer {
  public normalizePaths(
    denormalizedDoc: (Partial<OpenAPIObject> & Record<'root', any>)[]
  ): Record<'paths', OpenAPIObject['paths']> {
    const roots = filter(denormalizedDoc, (r) => r.root);
    const groupedByPath = groupBy(roots, ({ root }: Record<'root', any>) =>
      root.versionType === VersioningType.HEADER &&
      root.version &&
      root.version !== VERSION_NEUTRAL
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
          ...omit(route.root, ['method', 'path'])
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
