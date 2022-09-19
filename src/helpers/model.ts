import { normalize, strings } from "@angular-devkit/core";
import { SchematicsException, Tree } from '@angular-devkit/schematics';
import * as ts from 'typescript';

export interface Property {
    property: string;
    type: string;
    nullable: boolean;
    classType?: string;
}

export function getProperties(node: ts.InterfaceDeclaration | ts.ClassDeclaration, checker: ts.TypeChecker): Property[] {
    const result: Property[] = [];

    for (let prop of node.members) {
        const property: string = (prop.name as ts.Identifier).escapedText.toString();
        const type = checker.getTypeAtLocation(prop);
        const typeName = checker.typeToString(type);

        const nullable = !!(prop as ts.TypeElement).questionToken;

        result.push({
            property,
            type: typeName,
            nullable
        });
    }

    return result;
}

export function loadModel(_tree: Tree, _options: any) {
    let modelPath = normalize('./' + _options.modelPath + '/' + _options.name + '.model.ts');
    if (!_tree.exists(modelPath)) {
        throw new SchematicsException("Could not find model file");
    }

    const program = ts.createProgram([modelPath], {
        target: ts.ScriptTarget.Latest,
        module: ts.ModuleKind.ES2020
    });
    const sourceFile = program.getSourceFile(modelPath);
    const checker = program.getTypeChecker();

    // get only interfaces
    const interfaces = sourceFile?.statements.filter(ts.isInterfaceDeclaration);
    const dto = interfaces?.find(
        interfaceDec => interfaceDec.name.text === strings.classify(_options.name) + "DTO"
    );
    const filters = interfaces?.find(
        interfaceDec => interfaceDec.name.text === strings.classify(_options.name) + "Filters"
    );

    if (!dto) {
        throw new SchematicsException("DTO not found");
    }
    if (!filters) {
        throw new SchematicsException("Filters not found");
    }

    let dtoProperties = getProperties(dto, checker);
    dtoProperties = mapDtoTypesToClass(dtoProperties);

    const filtersProperties = getProperties(filters, checker);

    return [dtoProperties, filtersProperties];
}

export function mapDtoTypesToClass(dtos: Property[]) {
    for (let dto of dtos) {
        if (dto.type.endsWith("DTO")) {
            dto.classType = dto.type.split("DTO")[0];
        } else if (dto.type.endsWith("DTO[]")) {
            dto.classType = dto.type.split("DTO")[0] + "[]";
        } else if (dto.type === "DateString") {
            dto.classType = "Date";
        } else {
            dto.classType = dto.type;
        }
    }

    return dtos;
}