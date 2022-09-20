import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ListResultDTO } from 'src/app/helpers/listResult.interface';
import { formatDateForBackend } from 'src/app/helpers/time.utils';
import { environment } from 'src/environments/environment';

import { <%= classify(name) %>DTO, <%= classify(name) %>Filters } from 'src/app/commons/models/<%= dasherize(name) %>.model';

@Injectable({
    providedIn: "root"
})
export class Laravel<%= classify(name) %>Service {
    constructor(private httpClient: HttpClient) { }
    
    private get ROUTES() {
        return {
            list: environment.baseUrl + "/api/<%= underscore(pluralize(name)) %>",
            show: environment.baseUrl + "/api/<%= underscore(name) %>",
            store: environment.baseUrl + "/api/<%= underscore(name) %>",
            destroy: environment.baseUrl + "/api/<%= underscore(name) %>",
        };
    }

    public list(page: number,
        per_page: number,
        order: string,
        direction: string,
        filters:<%= classify(name) %>Filters,
        includes ?: string[]
    ): Observable<ListResultDTO<<%= classify(name) %>DTO>> {
        let params = {};
        if(order) params["order"] = "" + order;
        if(direction) params["direction"] = "" + direction;
        if(includes) params["includes[]"] = includes;
        if(filters) {
            <% for(let filter of filters) { if(filter.type === "boolean") { %>if(filters.<%= filter.property %> != null && filters.<%= filter.property %> != undefined)<% } else { %>if(filters.<%= filter.property %>)<% } %> <% if(filter.type === "Date") { %>params["<%= underscore(filter.property) %>"] = formatDateForBackend(filters.<%= filter.property %>); <% } else if (filter.type[0] === filter.type[0].toUpperCase()) { %>params["<%= underscore(filter.property) %>_id"] = filters.<%= filter.property %>?.id <% } else { %>params["<%= underscore(filter.property) %>"] = filters.<%= filter.property %>;<% } %>
            <% } %>
        }
        if(per_page) {
            params["per_page"] = "" + per_page;
            if (page) params["page"] = "" + page;
            return this.httpClient.get<ListResultDTO<<%= classify(name) %>DTO>> (this.ROUTES.list, {
                params: new HttpParams({ fromObject: params })
            });
        } else {
            return this.httpClient.get<<%= classify(name) %>DTO[]>(this.ROUTES.list, {
                params: new HttpParams({ fromObject: params })
            }).pipe(
                map(results => {
                    return {
                        data: results,
                        total: results.length
                    };
                })
            );
        }
    }

    public get<%= classify(name) %>ById(id: number): Observable<<%= classify(name) %>DTO>{
        let params = { id: "" + id };
        return this.httpClient.get<<%= classify(name) %>DTO>(this.ROUTES.show, {
            params: new HttpParams({
                fromObject: params
            })
        });
    }

    public upsert(<%= camelize(name) %>:<%= classify(name) %>DTO): Observable<<%= classify(name) %>DTO>{
        if(<%= camelize(name) %>.id) {
            return this.httpClient.put<<%= classify(name) %>DTO>(`${this.ROUTES.store}`, {<%= camelize(name) %>});
        } else {
            return this.httpClient.post<<%= classify(name) %>DTO>(`${this.ROUTES.store}`, {<%= camelize(name) %>});
        }
    }

    public delete (id: number): Observable<any>{
        let params = { id: "" + id };
        return this.httpClient.delete(this.ROUTES.destroy, {
            params: new HttpParams({
                fromObject: params
            })
        });
    }
}
