import { chain, noop, Rule, SchematicContext, Tree } from '@angular-devkit/schematics';

function getWorkspacePath(host: Tree): string {
    const possibleFiles = ['/angular.json', '/.angular.json'];
    return possibleFiles.filter(path => host.exists(path))[0];
}

function getWorkspace(host: Tree): any {
    const path = getWorkspacePath(host);
    const configBuffer = host.read(path);
    if (configBuffer === null) {
        throw new Error(`Could not find (${path})`);
    }
    const config = configBuffer.toString();

    return JSON.parse(config);
}

function updateWorkspaceCli(host: Tree, value: string[]) {
    const workspace = getWorkspace(host);
    const path = getWorkspacePath(host);

    if (workspace.cli?.schematicCollections) {
        value = Array.from(new Set([
            ...value,
            ...workspace.cli?.schematicCollections
        ]));
    }

    workspace.cli = {
        ...workspace.cli,
        schematicCollections: value,
    };


    host.overwrite(path, JSON.stringify(workspace, null, 2));
}

function setAsDefaultSchematics() {
    const schematicCollections = ['@simplenetworks/simple-schematics'];
    return (host: Tree) => {
        updateWorkspaceCli(host, schematicCollections);
        return host;
    };
}

export function ngAdd(options: any): Rule {
    return (host: Tree, context: SchematicContext) => {
        return chain([
            options && options.defaultCollection ? setAsDefaultSchematics() : noop(),
        ])(host, context);
    };
}