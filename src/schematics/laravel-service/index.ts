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
import { loadModel } from "../../helpers/model";

export function laravelService(_options: any): Rule {
    return (_tree: Tree, _context: SchematicContext) => {

        _options.name = basename(_options.name as Path);
        _options.path = normalize('/' + dirname((_options.path + '/' + _options.name) as Path));
        _options.modelPath = normalize('/' + dirname((_options.modelPath) + '/' as Path));

        const [dtoProperties, filtersProperties] = loadModel(_tree, _options);
        const modelPath = _options.modelPath;

        delete _options.modelPath;

        const templateSource = apply(
            url('./files'), [
            template({
                ..._options,
                camelize: strings.camelize,
                classify: strings.classify,
                dasherize: strings.dasherize,
                underscore: strings.underscore,
                pluralize: plural,
                dtos: dtoProperties,
                filters: filtersProperties,
                modelPath
            }),
            move(_options.path as string),
        ]);

        return chain([
            // externalSchematic('@schematics/angular', 'service', _options),
            mergeWith(templateSource, MergeStrategy.Overwrite),
        ]);
    };
}
