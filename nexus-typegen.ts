/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */







declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
  FishCharacteristicsCreateInput: { // input type
    color1: string; // String!
    color2?: string | null; // String
    family?: string | null; // String
    genus?: string | null; // String
    texture?: string | null; // String
  }
  FishCreateInput: { // input type
    cooked: boolean; // Boolean!
    enName: string; // String!
    fishCharacteristics: NexusGenInputs['FishCharacteristicsCreateInput']; // FishCharacteristicsCreateInput!
    jpName: string; // String!
    notes?: string | null; // String
  }
}

export interface NexusGenEnums {
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
}

export interface NexusGenObjects {
  Fish: { // root type
    cooked: boolean; // Boolean!
    enName: string; // String!
    id: string; // String!
    jpName: string; // String!
    notes: string; // String!
  }
  FishCharacteristics: { // root type
    color1: string; // String!
    color2?: string | null; // String
    family?: string | null; // String
    genus?: string | null; // String
    texture?: string | null; // String
  }
  Mutation: {};
  Query: {};
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars

export interface NexusGenFieldTypes {
  Fish: { // field return type
    cooked: boolean; // Boolean!
    enName: string; // String!
    fishCharacteristics: NexusGenRootTypes['FishCharacteristics'][]; // [FishCharacteristics!]!
    id: string; // String!
    jpName: string; // String!
    notes: string; // String!
  }
  FishCharacteristics: { // field return type
    color1: string; // String!
    color2: string | null; // String
    family: string | null; // String
    genus: string | null; // String
    texture: string | null; // String
  }
  Mutation: { // field return type
    createFish: NexusGenRootTypes['Fish']; // Fish!
    deleteFishById: NexusGenRootTypes['Fish'] | null; // Fish
    updateNotesById: NexusGenRootTypes['Fish'] | null; // Fish
  }
  Query: { // field return type
    allFish: NexusGenRootTypes['Fish'][]; // [Fish!]!
    findFishByColor: NexusGenRootTypes['Fish'][]; // [Fish!]!
    findFishByEnglishName: NexusGenRootTypes['Fish'] | null; // Fish
    findFishByJapaneseName: NexusGenRootTypes['Fish'] | null; // Fish
    findFishByPreparation: NexusGenRootTypes['Fish'][]; // [Fish!]!
    findFishByTexture: NexusGenRootTypes['Fish'][]; // [Fish!]!
  }
}

export interface NexusGenFieldTypeNames {
  Fish: { // field return type name
    cooked: 'Boolean'
    enName: 'String'
    fishCharacteristics: 'FishCharacteristics'
    id: 'String'
    jpName: 'String'
    notes: 'String'
  }
  FishCharacteristics: { // field return type name
    color1: 'String'
    color2: 'String'
    family: 'String'
    genus: 'String'
    texture: 'String'
  }
  Mutation: { // field return type name
    createFish: 'Fish'
    deleteFishById: 'Fish'
    updateNotesById: 'Fish'
  }
  Query: { // field return type name
    allFish: 'Fish'
    findFishByColor: 'Fish'
    findFishByEnglishName: 'Fish'
    findFishByJapaneseName: 'Fish'
    findFishByPreparation: 'Fish'
    findFishByTexture: 'Fish'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    createFish: { // args
      data: NexusGenInputs['FishCreateInput']; // FishCreateInput!
    }
    deleteFishById: { // args
      id: string; // String!
    }
    updateNotesById: { // args
      id: string; // String!
      updateNotes?: string | null; // String
    }
  }
  Query: {
    findFishByColor: { // args
      color?: string | null; // String
    }
    findFishByEnglishName: { // args
      enName?: string | null; // String
    }
    findFishByJapaneseName: { // args
      jpName?: string | null; // String
    }
    findFishByPreparation: { // args
      cooked?: boolean | null; // Boolean
    }
    findFishByTexture: { // args
      texture?: string | null; // String
    }
  }
}

export interface NexusGenAbstractTypeMembers {
}

export interface NexusGenTypeInterfaces {
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = keyof NexusGenInputs;

export type NexusGenEnumNames = never;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = never;

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false
    resolveType: true
    __typename: false
  }
}

export interface NexusGenTypes {
  context: any;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginInputTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
  interface NexusGenPluginArgConfig {
  }
}