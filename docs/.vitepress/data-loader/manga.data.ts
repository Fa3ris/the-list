import { createLoaderForDirectory, type YamlMetadata } from './directory-entries-loader';

export type Data = YamlMetadata[]

declare const data: Data
export { data };

export default createLoaderForDirectory('manga')