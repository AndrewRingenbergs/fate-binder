import React from 'react';

function mapObject(object, func) {
  return Object.keys(object).reduce((acc, key) => {
    acc[key] = func(object[key]); // eslint-disable-line no-param-reassign
    return acc;
  }, {});
}

const defaultBreakpoints = {
  xss: '480px',
  xs: '600px',
  smTablet: '720px',
  sm: '840px',
  md: '960px',
  lgTablet: '1024px',
  lg: '1280px',
  xl: '1440px',
  xxl: '1600px',
  xxxl: '1920px',
};

export default function (sizeMap = defaultBreakpoints) {
  return Component =>
    class MeasuredComponent extends React.Component {
      constructor(props) {
        super(props);
        this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
      }
      componentWillMount() {
        const mediaQueries = mapObject(sizeMap, size => window.matchMedia(`(min-width: ${size})`));
        const sizes = mapObject(mediaQueries, q => q.matches);
        Object.keys(mediaQueries).forEach((key) => {
          mediaQueries[key].addListener(this.mediaQueryChanged);
        });
        this.setState({ mediaQueries, sizes });
      }
      componentWillUnmount() {
        const mediaQueries = this.state.mediaQueries;
        Object.keys(mediaQueries)
          .forEach(key => mediaQueries[key].removeListener(this.mediaQueryChanged));
      }
      mediaQueryChanged() {
        const sizes = mapObject(this.state.mediaQueries, q => q.matches);
        this.setState({ sizes });
      }
      render() {
        return (<Component {... this.props} sizes={this.state.sizes} />);
      }
    };
}
