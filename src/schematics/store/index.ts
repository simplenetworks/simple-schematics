import { basename, dirname, normalize, Path, strings } from "@angular-devkit/core";
import {
    apply,
    chain,
    // externalSchematic,
    MergeStrategy,
    mergeWith,
    move,
    Rule,
    SchematicContext,
    template,
    Tree,
    url,
} from '@angular-devkit/schematics';
import { plural } from 'pluralize';

export function store(_options: any): Rule {
    return (_tree: Tree, _context: SchematicContext) => {
        _options.name = basename(_options.name as Path);
        _options.path = normalize('/' + dirname((_options.path + '/' + _options.name) as Path));

        const entities = [...new Set(
            [
                ..._tree.getDir(normalize((_options.path + '/reducers'))).subfiles.map(name => strings.camelize(name.replace('.reducer.ts', ''))),
                _options.name,
            ]
        )];

        if ("modelPath" in _options) {
            delete _options.modelPath;
        }

        const templateSource = apply(
            url('./files'), [
            template({
                ..._options,
                classify: strings.classify,
                camelize: strings.camelize,
                dasherize: strings.dasherize,
                underscore: strings.underscore,
                pluralize: plural,
                entities
            }),
            move(_options.path as string),
        ]);

        return chain([
            // externalSchematic('@schematics/angular', 'service', _options),
            mergeWith(templateSource, MergeStrategy.Overwrite),
        ]);
    };
}
