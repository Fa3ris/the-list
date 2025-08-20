import { createLoaderForDirectory, type YamlMetadata } from './directory-entries-loader';

declare const data: YamlMetadata[]
export { data };

export default createLoaderForDirectory('anime')