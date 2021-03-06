// @flow
import { observable } from 'mobx'
import qs from 'qs'
import createRouteKey from './createRouteKey'
import type { Params, Query, Route, RouteStateTreeNode } from './types'

export default function createRoute<C: Object, D: Object>(node: RouteStateTreeNode<C, D>, segment: string, params: Params, query: Query): Route<C,D> {
  const key = createRouteKey(node, segment)
  return observable({
    node: node,
    key,
    value: `${key}?${qs.stringify(query)}`,
    segment,
    params,
    query,
    context: observable.ref(node.value.getContext()),
    data: { ...node.value.getData(), transitionState: null },
    onTransition: node.value.onTransition
  })
}
