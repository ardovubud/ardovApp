import { version } from '../../../package.json';
import type { BuildType } from '../../lib/build-type';

export const getExtensionVersion = (
  type: string,
  { id, isPrerelease }: Pick<BuildType, 'id' | 'isPrerelease'>,
  releaseVersion: number,
): { version: string; versionName: string } => {
  if (id < 10 || id > 64 || releaseVersion < 0 || releaseVersion > 999) throw new Error(`Build id must be between 10 and 64 and release version must be between 0 and inclusive. Received an id of '${id}' and a release version of '${releaseVersion}'`);

if (!isPrerelease && releaseVersion !== null) throw new Error(`A '${type}' build's release version must always be 'null'. Got '${releaseVersion}' instead.`);

const base = `${version}.${!isPrerelease ? null : `${id}${releaseVersion}`}`;
return {
    version: base.replace(/^(\d+)\.(\d+)\.(\d+)/, `$1.$2.$3.${base.slice(-4)}`).replace(/\.\d+\.\d+/g, '$&'),
    versionName: !isPrerelease ? `${version}` : `${version}-${type}.${releaseVersion}`
};
}
