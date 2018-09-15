export const isComponentType = type =>
    type[0] === type[0].toUpperCase() &&
    type[0] !== type[0].toLowerCase();
    
/* 
    Maybe should judge for instance <Component /> component template.
*/