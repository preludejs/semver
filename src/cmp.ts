import * as Cmp from '@prelude/cmp'
import parse from './parse.js'
import type { Semver } from './prelude.js'

const cmp: Cmp.t<string | Semver> =
  (a, b) =>
    typeof a === 'string' ?
      cmp(parse(a), b) :
      typeof b === 'string' ?
        cmp(a, parse(b)) :
        Cmp.chain<Semver>(
          Cmp.map(Cmp.number, _ => _.major),
          Cmp.map(Cmp.number, _ => _.minor),
          Cmp.map(Cmp.number, _ => _.patch),
          Cmp.map(Cmp.string, _ => _.prerelease ?? ''),
          Cmp.map(Cmp.string, _ => _.build ?? ''),
          Cmp.map(Cmp.string, _ => _.date ?? '')
        )(a, b)

export default cmp
