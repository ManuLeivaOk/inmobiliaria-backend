"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvailableService = exports.PropertyStatus = exports.Currency = exports.PropertyType = exports.PropertyOperationType = void 0;
var PropertyOperationType;
(function (PropertyOperationType) {
    PropertyOperationType["VENTA"] = "VENTA";
    PropertyOperationType["ALQUILER"] = "ALQUILER";
    PropertyOperationType["ALQUILER_TEMPORAL"] = "ALQUILER_TEMPORAL";
})(PropertyOperationType || (exports.PropertyOperationType = PropertyOperationType = {}));
var PropertyType;
(function (PropertyType) {
    PropertyType["CASA"] = "CASA";
    PropertyType["DEPARTAMENTO"] = "DEPARTAMENTO";
    PropertyType["LOCAL"] = "LOCAL";
    PropertyType["TERRENO"] = "TERRENO";
    PropertyType["OFICINA"] = "OFICINA";
    PropertyType["COCHERA"] = "COCHERA";
    PropertyType["PH"] = "PH";
    PropertyType["QUINTA"] = "QUINTA";
})(PropertyType || (exports.PropertyType = PropertyType = {}));
var Currency;
(function (Currency) {
    Currency["ARS"] = "ARS";
    Currency["USD"] = "USD";
    Currency["EUR"] = "EUR";
})(Currency || (exports.Currency = Currency = {}));
var PropertyStatus;
(function (PropertyStatus) {
    PropertyStatus["BORRADOR"] = "BORRADOR";
    PropertyStatus["PUBLICADA"] = "PUBLICADA";
    PropertyStatus["RESERVADA"] = "RESERVADA";
    PropertyStatus["VENDIDA"] = "VENDIDA";
    PropertyStatus["ALQUILADA"] = "ALQUILADA";
    PropertyStatus["INACTIVA"] = "INACTIVA";
})(PropertyStatus || (exports.PropertyStatus = PropertyStatus = {}));
var AvailableService;
(function (AvailableService) {
    AvailableService["AGUA"] = "agua";
    AvailableService["LUZ"] = "luz";
    AvailableService["GAS"] = "gas";
    AvailableService["CLOACAS"] = "cloacas";
    AvailableService["CORDON_CUNETA"] = "cordon_cuneta";
    AvailableService["PAVIMENTO"] = "pavimento";
})(AvailableService || (exports.AvailableService = AvailableService = {}));
//# sourceMappingURL=property.enums.js.map