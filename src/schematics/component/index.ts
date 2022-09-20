import { basename, dirname, normalize, Path, strings } from "@angular-devkit/core";
import {
    apply,
    chain,
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
import { loadModel } from "../../helpers/model";

export function component(_options: any): Rule {
    return (_tree: Tree, _context: SchematicContext) => {
        _options.name = basename(_options.name as Path);
        _options.path = normalize('/' + dirname((_options.path + '/' + strings.dasherize(_options.name) + '-list') as Path));
        _options.modelPath = normalize('/' + dirname((_options.modelPath) + '/' as Path));

        const [dtos, filters] = loadModel(_tree, _options);
        const modelPath = _options.modelPath;

        delete _options.modelPath;

        const templateSource = apply(
            url('./files'), [
            template({
                ..._options,
                classify: strings.classify,
                camelize: strings.camelize,
                dasherize: strings.dasherize,
                underscore: strings.underscore,
                pluralize: plural,
                dtos,
                filters,
                modelPath
            }),
            move(_options.path as string),
        ]);

        _options.name = basename((plural(strings.dasherize(_options.name))) as Path);

        return chain([
            // externalSchematic('@schematics/angular', 'component', _options),
            mergeWith(templateSource, MergeStrategy.Overwrite),
        ]);
    };
}
