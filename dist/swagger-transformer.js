"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwaggerTransformer = void 0;
const common_1 = require("@nestjs/common");
const lodash_1 = require("lodash");
const sort_object_lexicographically_1 = require("./utils/sort-object-lexicographically");
class SwaggerTransformer {
    hasRootKey(r) {
        return !!r.root;
    }
    hasRootKeyWithVersions(includeVersions) {
        return ({ root }) => {
            var _a;
            return root &&
                (!((_a = root.versions) === null || _a === void 0 ? void 0 : _a.length) ||
                    (root.versionType === common_1.VersioningType.HEADER &&
                        root.versions.some((v) => includeVersions.includes(v))) ||
                    (root.versionType === common_1.VersioningType.URI &&
                        includeVersions.some((v) => root.path.includes(`/${v}/`))));
        };
    }
    getVersionedPath(includeVersions) {
        return ({ root }) => {
            var _a;
            if (root.versionType !== common_1.VersioningType.URI &&
                ((_a = root.versions) === null || _a === void 0 ? void 0 : _a.length) &&
                (!includeVersions || (includeVersions === null || includeVersions === void 0 ? void 0 : includeVersions.length) > 1)) {
                return `${root.path} version${root.versions.length > 1 ? 's' : ''}: ${root.versions.join(', ')}`;
            }
            return root.path;
        };
    }
    normalizePaths(denormalizedDoc, includeVersions) {
        const roots = (0, lodash_1.filter)(denormalizedDoc, includeVersions
            ? this.hasRootKeyWithVersions(includeVersions)
            : this.hasRootKey);
        const groupedByPath = (0, lodash_1.groupBy)(roots, this.getVersionedPath(includeVersions));
        const paths = (0, lodash_1.mapValues)(groupedByPath, (routes) => {
            const keyByMethod = (0, lodash_1.keyBy)(routes, ({ root }) => root.method);
            return (0, lodash_1.mapValues)(keyByMethod, (route) => {
                const mergedDefinition = Object.assign(Object.assign({}, (0, lodash_1.omit)(route, 'root')), (0, lodash_1.omit)(route.root, ['method', 'path', 'versions', 'versionType']));
                return (0, sort_object_lexicographically_1.sortObjectLexicographically)(mergedDefinition);
            });
        });
        return {
            paths
        };
    }
    unescapeColonsInPath(app, moduleRoutes) {
        const httpAdapter = app.getHttpAdapter();
        const usingFastify = httpAdapter && httpAdapter.getType() === 'fastify';
        const unescapeColon = usingFastify
            ? (path) => path.replace(/:\{([^}]+)\}/g, ':$1')
            : (path) => path.replace(/\[:\]/g, ':');
        return moduleRoutes.map((moduleRoute) => (Object.assign(Object.assign({}, moduleRoute), { root: Object.assign(Object.assign({}, moduleRoute.root), { path: unescapeColon(moduleRoute.root.path) }) })));
    }
}
exports.SwaggerTransformer = SwaggerTransformer;
