import React, { Component } from 'react'
import Tabs from 'react-draggable-tabs'
import ReactDOM from 'react-dom'
import PageFinder from './PageFinder'

class App extends Component {
  constructor(props) {
    super(props)
    this.moveTab = this.moveTab.bind(this)
    this.selectTab = this.selectTab.bind(this)
    this.closedTab = this.closedTab.bind(this)
    this.addTab = this.addTab.bind(this)
    this.setURL = this.setURL.bind(this)
    this.state = {}
    this.state.url = 'http://'
    this.state = {
      url: 'http://',
      tabs: [
        {
          id: 1,
          active: true,
          content: 'Home',
          display: (
            <PageFinder siteURL={this.state.url} onChange={this.setURL} />
          )
        },
        {
          id: 2,
          content: 'Duck Duck Go',
          display: (
            <iframe
              title="DuckDuckGo"
              src="https://duckduckgo.com/"
              style={{
                border: '0',
                margin: '50px',
                width: '500px',
                height: '800px'
              }}
            />
          )
        }
      ]
    }
  }

  setURL(e) {
    this.setState({ url: e.target.value })
  }

  moveTab(dragIndex, hoverIndex) {
    this.setState((state, props) => {
      let newTabs = [...state.tabs]
      newTabs.splice(hoverIndex, 0, newTabs.splice(dragIndex, 1)[0])

      return { tabs: newTabs }
    })
  }

  selectTab(selectedIndex, selectedID) {
    this.setState((state, props) => {
      const newTabs = state.tabs.map(tab => ({
        ...tab,
        active: tab.id === selectedID
      }))
      return { tabs: newTabs }
    })
  }

  closedTab(removedIndex, removedID) {
    this.setState((state, props) => {
      let newTabs = [...state.tabs]
      newTabs.splice(removedIndex, 1)

      if (state.tabs[removedIndex].active && newTabs.length !== 0) {
        // automatically select another tab if needed
        const newActive = removedIndex === 0 ? 0 : removedIndex - 1
        newTabs[newActive].active = true
      }

      return { tabs: newTabs }
    })
  }

  addTab() {
    this.setState((state, props) => {
      let newTabs = [...state.tabs]
      newTabs.push({
        id: newTabs.length + 1,
        content: 'Cute *',
        display: <div key={newTabs.length + 1}>Cute *</div>
      })

      return { tabs: newTabs }
    })
  }

  render() {
    const activeTab = this.state.tabs.filter(tab => tab.active === true)
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <Tabs
          moveTab={this.moveTab}
          selectTab={this.selectTab}
          closeTab={this.closedTab}
          tabs={this.state.tabs}
        >
          <button onClick={this.addTab}>+</button>
        </Tabs>
        {activeTab.length !== 0 ? activeTab[0].display : ''}
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
