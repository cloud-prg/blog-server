# TypeOrm 开发反馈集合
- controller中，接口路由如果加了 **@Response** 装饰器，则会导致api测试请求一直在加载。
- 在两个互相关联的service中，如果引用了两个实体库，会导致 **依赖循环** 问题。但同时又要保证对应的服务在对应的控制器接口路由中。解决方案是，在指定方法写在存在两个实体库的服务中，再到另一个服务中去调用该服务中的方法。
- 关联的属性切记要加上cascade，以及在对立的关联属性中添加 `onDelete: 'CASCADE' onUpdate: 'CASCADE'`，否则会导致更新属性时，服务器报内部错误。
- synchronize 设置为true时，会自动同步数据库表结构，但会导致每次启动项目时，都会删除数据库表，然后重新创建。
- 每写好一个module, 都要在app.module.ts中引入。
- 每当一个service需要引入其他的service、entityRepository、entityManager时，都要在module中引入。