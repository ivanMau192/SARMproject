'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">
                        <img alt="" class="img-responsive" data-type="compodoc-logo" data-src=images/logo.png> 
                    </a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Escribe para buscar"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Comenzando</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Descripción general
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>Léeme
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencias
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Módulos</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-55c2ad98d91538948d4b050d17d697c6"' : 'data-target="#xs-components-links-module-AppModule-55c2ad98d91538948d4b050d17d697c6"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Componentes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-55c2ad98d91538948d4b050d17d697c6"' :
                                            'id="xs-components-links-module-AppModule-55c2ad98d91538948d4b050d17d697c6"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BathroomsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BathroomsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CommercialComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CommercialComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/InitialViewComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">InitialViewComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoginComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LoginComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MatApprovedPickerRenderComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MatApprovedPickerRenderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MatContractPickerRenderComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MatContractPickerRenderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MatModulesPickerRenderComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MatModulesPickerRenderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MatPermissionsPickerRenderComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MatPermissionsPickerRenderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MatProfilesPickerRenderComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MatProfilesPickerRenderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MatServicesPickerRenderComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MatServicesPickerRenderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MatStatusPickerRenderComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MatStatusPickerRenderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ServicesComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ServicesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UsersComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UsersComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/WastesComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">WastesComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link">AppRoutingModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Clases</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/EmailErrorStateMatcher.html" data-type="entity-link">EmailErrorStateMatcher</a>
                            </li>
                            <li class="link">
                                <a href="classes/PasswordErrorStateMatcher.html" data-type="entity-link">PasswordErrorStateMatcher</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Inyectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/LoginService.html" data-type="entity-link">LoginService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ServicesService.html" data-type="entity-link">ServicesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UsersService.html" data-type="entity-link">UsersService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interceptors-links"' :
                            'data-target="#xs-interceptors-links"' }>
                            <span class="icon ion-ios-swap"></span>
                            <span>Interceptores</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="interceptors-links"' : 'id="xs-interceptors-links"' }>
                            <li class="link">
                                <a href="interceptors/AuthInterceptor.html" data-type="entity-link">AuthInterceptor</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Rutas</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Cobertura de la documentación</a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});