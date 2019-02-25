const pageList = [
  {
    items: [
      { name: 'first' },
      { name: 'second' }
    ]
  },
  {
    items: [
      { name: 'third' },
      { name: 'fourth' }
    ]
  }
]

async function loadPage (n) {
  await timeout(100) // Simulate async
  return pageList[n]
}

async function* getPages () {
  let n = 0
  let page

  while ((page = await loadPage(n++))) {
    yield page
  }
}

async function* pagesToItems (pages) {
  for await (let page of pages) {
    for (let item of page.items) {
      yield item
    }
  }
}

const pages = getPages()
const items = pagesToItems(pages)

for await (let item of items) {
  console.log(item.name)
}
