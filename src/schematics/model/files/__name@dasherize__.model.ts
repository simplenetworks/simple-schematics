import { AbstractControl } from '@angular/forms';

import { Base, BaseDTO } from './base.model';
import { formatDateForBackend } from 'src/app/helpers/time.utils';
<% for (let dto of dtos) { %><% if (dto.type.endsWith('DTO') || dto.type.endsWith("DTO[]")) { %>
import { <%= classify(dto.type).replace("[]", "") %>, <%= classify(dto.type.split("DTO")[0].replace("[]", "")) %> } from './<%= dasherize(dto.type.split("DTO")[0].replace("[]", "")) %>.model'; <% } %> <% } %>

export interface <%= classify(name) %>Filters {
    <% for (let filter of filters) { %><%= filter.property %>: <%= filter.type %>;
    <% } %>
}

export interface <%= classify(name) %>DTO extends BaseDTO {
    <% for (let dto of dtos) { %><%= dto.property %><%= dto.nullable ? '?' : '' %>: <%= dto.type %>;
    <% } %>
}

export class <%= classify(name) %> extends Base {
    <% for (let dto of dtos) { %><%= camelize(dto.property) %><%= (dto.nullable || dto.classType === "Date" || dto.type.endsWith("DTO")) ? '?' : '' %>: <%= dto.classType %>;
    <% } %>
    constructor(source: <%= classify(name) %>DTO) {
        super(source);
        if (source) {
            <% for (let dto of dtos) { %>this.<%= camelize(dto.property) %> = <% if(dto.classType === "Date") { %>source.<%= dto.property %> ? new Date(source.<%= dto.property %>) : undefined<% } else if(dto.type.endsWith("DTO")) { %>source.<%= dto.property %> ? new <%= dto.type.split("DTO")[0] %>(source.<%= dto.property %>) : undefined;<% } else if(dto.type.endsWith("DTO[]")) { %>source.<%= dto.property %>?.map((dto: <%= dto.type.replace("[]", "") %>) => new <%= dto.type.split("DTO")[0].replace("[]", "") %>(dto));<% } else { %>source.<%= dto.property %><% } %>
            <% } %>
        }
    }

    toDTO(): <%= classify(name) %>DTO {
        let result: <%= classify(name) %>DTO = <<%= classify(name) %>DTO>super.toDTO();
        <% for (let dto of dtos) { %>result.<%= dto.property %> = <% if(dto.type.endsWith("DTO[]")) { %>this.<%= camelize(dto.property) %>?.map((obj: <%= dto.classType.split("[]")[0] %>) => obj.toDTO());<% } else if(dto.type.endsWith("DTO")) { %>this.<%= camelize(dto.property) %>?.toDTO();<% } else if(dto.classType === "Date") { %>formatDateForBackend(this.<%= camelize(dto.property) %>);<% } else { %>this.<%= camelize(dto.property) %>;<% } %>
        <% } %>
        return result;
    }

    static fromFormGroup(formGroup: AbstractControl, original?: <%= classify(name) %>) {
        const formModel = formGroup.value;
        let <%= camelize(name) %>: <%= classify(name) %> = new <%= classify(name) %>(null);
        <% for (let dto of dtos) { %><%= camelize(name) %>.<%= camelize(dto.property) %> = formModel.<% if(dto.property.endsWith("id")) { %><%= camelize(dto.property.split("id")[0]) %>?.id;<% } else if(dto.property.endsWith("ids")) { %><%= pluralize(camelize(dto.property.split("id")[0])) %>?.map((obj: any) => obj?.id);<% } else { %><%= camelize(dto.property) %>;<% } %>
        <% } %>
        if (original) {
            <%= name %>.id = original.id;
        }
        return <%= name %>;
    }

    get stringRepresentation(): string {
        return this.id.toString();
    }
}
