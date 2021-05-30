var plugins = [{
      plugin: require('/Users/a.martinez/Desktop/gatsby-projects/slices/gatsby/node_modules/gatsby-plugin-react-helmet/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      plugin: require('/Users/a.martinez/Desktop/gatsby-projects/slices/gatsby/node_modules/gatsby-plugin-styled-components/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      plugin: require('/Users/a.martinez/Desktop/gatsby-projects/slices/gatsby/node_modules/gatsby-source-sanity/gatsby-ssr'),
      options: {"plugins":[],"projectId":"1fzxsso7","dataset":"production","watchMode":true,"token":"skgrlWQmJRyiGkI7RRtXM7eMN0kwgKRXNqvnTDHuFSuZCAVFr1g3ZHHHFotgXyB91mzs3vle1jgLKhxm6lE30UKSaB9J4M5AJeuNqkANr3OSa2y4fpas43XcvuINAeXU0X8feb0gZC6EZD3cpODxxxouezbtA40pWqmWCAnjnOJpi1TkoZ0p"},
    },{
      plugin: require('/Users/a.martinez/Desktop/gatsby-projects/slices/gatsby/gatsby-ssr'),
      options: {"plugins":[]},
    }]
// During bootstrap, we write requires at top of this file which looks like:
// var plugins = [
//   {
//     plugin: require("/path/to/plugin1/gatsby-ssr.js"),
//     options: { ... },
//   },
//   {
//     plugin: require("/path/to/plugin2/gatsby-ssr.js"),
//     options: { ... },
//   },
// ]

const apis = require(`./api-ssr-docs`)

// Run the specified API in any plugins that have implemented it
module.exports = (api, args, defaultReturn, argTransform) => {
  if (!apis[api]) {
    console.log(`This API doesn't exist`, api)
  }

  // Run each plugin in series.
  // eslint-disable-next-line no-undef
  let results = plugins.map(plugin => {
    if (!plugin.plugin[api]) {
      return undefined
    }
    const result = plugin.plugin[api](args, plugin.options)
    if (result && argTransform) {
      args = argTransform({ args, result })
    }
    return result
  })

  // Filter out undefined results.
  results = results.filter(result => typeof result !== `undefined`)

  if (results.length > 0) {
    return results
  } else {
    return [defaultReturn]
  }
}
