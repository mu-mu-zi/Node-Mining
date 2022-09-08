
interface GetaverseNodes {
  icon: string
  title: string
  text: string
  attr: string
}

export const getaverseNodes:GetaverseNodes[] = [
  {
    icon: require('assets/svg/getaverseNodes_1.svg').default,
    title: 'Global Nodes',
    text: '4,847,324',
    attr: 'globalNode'
  },
  {
    icon: require('assets/svg/getaverseNodes_2.svg').default,
    title: 'Running Nodes',
    text: '45.23',
    attr: 'runNode'
  },
  {
    icon: require('assets/svg/getaverseNodes_3.svg').default,
    title: 'Total global production',
    text: '232,787,324,367',
    attr: 'total'
  },
  {
    icon: require('assets/svg/getaverseNodes_4.svg').default,
    title: 'Effective contribution node',
    text: '237',
    attr: 'efficientNode'
  },
]