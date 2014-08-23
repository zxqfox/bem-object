# bem-object

[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependency Status][depstat-image]][depstat-url]

BEM object is abstract definition of group of files, that matching to BEM naming conventions. For example:

```bash
/block              # bem-object (1)
    block.css       # file, that described by (1)
    /_mod               # bem-object (2)
        block_mod.css   # file, that described by (2)
        block_mod_val1.css      # bem-object (3)
        block_mod_val2.css      # bem-object (4)
```

As you can see, modificator values can't be accessed by `(2)`, so we generate additional `(3)` and `(4)` to access them.

## Properties

Each object will contain next properties:

 * `block` - name of the block
 * `elem` - name of the element
 * `mod` - name of the modificator
 * `val` - value of the modificator
 * `level` - level of definition of current block (full path to level directory)

## Getters

#### bemObject.id
###### alias bem

BEM identifier, composed from `block`, `elem`, `mod` and `val`.

#### bemObject.path

Full path to directory, that contains block files. Constructed from `level`, `block`, `elem` and `mod`.

#### bemObject.required

This property will return an array of properly initiated BEM object.

#### bemObject.expected

Same as `required`, but for `expect` property.

## Helpers

This methods helps you create BEM object from different sources (like `level` directory in case of `stream` method).

#### stream(path, [options])

Streams all BEM objects under `path`, `path/_*`, `path/__*`, `path/__*/_*` and all modificator values in `path/_*` and `path/__*/_*` (`__` and `_` are default values from options).

###### options
Type: `Object`  
Default: `{ elem: '__', mod: '_' }`

###### path
Type: `String`  

Contains path to directory (we passing `levels` directories in `gulp-bem`) in which method should find all BEM object that correcsponds to blocks, blocks elements, blocks modificators and blocks elements modificators.

#### create(path, [options], cb)

Constructs BEM object from path with `fromPath` method.

###### path
Type: `String`

Direct path to directory (or file with modificator value in BEM formed name).

#### fromPath(path, options, [ext])

Constructs BEM object from path to block. It will parse path to extract `block`, `elem`, `mod`, `level`.

###### options
Type: `Object`  
Default: `{ elem: '__', mod: '_' }`

Describes options, that will be used for BEM properties matching in path.

##### path
Type: `String`

Path to block __directory__.

##### ext
Type: `Object`

Object with properties, which will be assigned to constructed BEM object.

## License

MIT (c) 2014 Vsevolod Strukchinsky

[npm-url]: https://npmjs.org/package/bem-object
[npm-image]: http://img.shields.io/npm/v/bem-object.svg?style=flat

[travis-url]: http://travis-ci.org/floatdrop/bem-object
[travis-image]: http://img.shields.io/travis/floatdrop/bem-object.svg?branch=master&style=flat

[depstat-url]: http://david-dm.org/floatdrop/bem-object
[depstat-image]: http://img.shields.io/david/floatdrop/bem-object.svg?style=flat

[coveralls-url]: https://coveralls.io/r/floatdrop/bem-object
[coveralls-image]: http://img.shields.io/coveralls/floatdrop/bem-object.svg?style=flat
