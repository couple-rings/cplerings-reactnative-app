import { useFocusEffect } from "@react-navigation/native";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";
import CurlButton from "src/components/button/CurlButton";
import Order from "src/components/card/Order";
import { removeOrder, selectOrder } from "src/redux/slices/order.slice";
import { getTransportOrders } from "src/services/transportOrder.service";
import { pageSize, primaryColor } from "src/util/constants";
import { ButtonVariant, TransportOrderStatus } from "src/util/enums";
import { formatStatus } from "src/util/functions";
import { useAppDispatch, useAppSelector } from "src/util/hooks";
import { fetchTransportOrders } from "src/util/querykey";

const initOption = [
  {
    title: "All",
    quantity: 0,
  },
  {
    title: TransportOrderStatus.Waiting,
    quantity: 0,
  },
  {
    title: TransportOrderStatus.OnGoing,
    quantity: 0,
  },
  {
    title: TransportOrderStatus.Redelivering,
    quantity: 0,
  },
  {
    title: TransportOrderStatus.Delivering,
    quantity: 0,
  },
  {
    title: TransportOrderStatus.Completed,
    quantity: 0,
  },
  {
    title: TransportOrderStatus.Rejected,
    quantity: 0,
  },
];

const initMetaData = {
  page: 0,
  pageSize,
  totalPages: 0,
  count: 0,
};

const OrderList = () => {
  const [metaData, setMetaData] = useState<IListMetaData>(initMetaData);
  const [filterObj, setFilterObj] = useState<ITransportOrderFilter | null>(
    null
  );
  const [options, setOptions] = useState(initOption);
  const [orderList, setOrderList] = useState<ITransportOrder[]>([]);
  const [selected, setSelected] = useState(initOption[0]);

  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const { id: userId } = useAppSelector((state) => state.auth.userInfo);

  const {
    data: response,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: [fetchTransportOrders, filterObj],

    queryFn: () => {
      if (filterObj) return getTransportOrders(filterObj);
    },
    enabled: !!filterObj,
  });

  const handleLoadMore = () => {
    if (
      filterObj &&
      metaData.page !== metaData.totalPages - 1 &&
      metaData.totalPages > 1
    )
      setFilterObj({
        ...filterObj,
        page: metaData.page + 1,
      });
  };

  const handleFilterStatus = (item: { title: string; quantity: number }) => {
    setSelected(item);
    if (filterObj) {
      if (item.title === "All")
        setFilterObj({
          page: 0,
          pageSize,
          transporterId: userId,
          status: undefined,
        });
      else
        setFilterObj({
          page: 0,
          pageSize,
          transporterId: userId,
          status: item.title as TransportOrderStatus,
        });
    }
  };

  useEffect(() => {
    if (response && response.data) {
      const { items, ...rest } = response.data;

      if (items.length !== 0) {
        if (rest.page === 0) setOrderList(items);
        else setOrderList((current) => [...current, ...items]);

        setMetaData(rest);
      }

      if (items.length === 0 && rest.page === 0) {
        setOrderList([]);
        setMetaData(initMetaData);
      }
    }
  }, [response]);

  useEffect(() => {
    const clone = _.cloneDeep(initOption);

    orderList.forEach((item) => {
      clone.forEach((option) => {
        if (item.status === option.title) option.quantity += 1;
      });
    });

    const foundDelivering = orderList.find(
      (item) => item.status === TransportOrderStatus.Delivering
    );
    if (foundDelivering) dispatch(selectOrder(foundDelivering.id));
    else dispatch(removeOrder());

    clone[0].quantity = orderList.length;

    setOptions(clone);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderList]);

  useEffect(() => {
    setFilterObj({
      page: 0,
      pageSize,
      transporterId: userId,
    });
  }, [userId]);

  useFocusEffect(
    React.useCallback(() => {
      setSelected(initOption[0]);
      setFilterObj({
        page: 0,
        pageSize,
        transporterId: userId,
        status: undefined,
      });
    }, [userId])
  );

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: [fetchTransportOrders, filterObj],
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterObj]);

  return (
    <View style={styles.container}>
      <View style={styles.statusBar}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={options}
          renderItem={({ item }) => (
            <CurlButton
              title={`${formatStatus(item.title)}`}
              variant={
                selected.title === item.title
                  ? ButtonVariant.Contained
                  : ButtonVariant.Outlined
              }
              options={{ onPress: () => handleFilterStatus(item) }}
            />
          )}
          contentContainerStyle={styles.content}
        />
      </View>

      {isLoading || isFetching ? (
        <View style={styles.loading}>
          <ActivityIndicator color={primaryColor} />
        </View>
      ) : (
        <FlatList
          onEndReached={handleLoadMore}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.empty}>Hiện không có đơn nào</Text>
            </View>
          }
          ListHeaderComponent={
            <View style={{ marginBottom: 8 }}>
              {metaData.count !== 0 && (
                <Text>Hiện đang có {metaData.count} đơn</Text>
              )}
            </View>
          }
          style={{ width: "100%" }}
          showsVerticalScrollIndicator={false}
          data={orderList}
          renderItem={({ item }) => <Order data={item} />}
          contentContainerStyle={{ padding: 16 }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  statusBar: {
    width: "100%",
    backgroundColor: primaryColor,
    paddingBottom: 20,
  },
  content: {
    paddingHorizontal: 16,
    gap: 16,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
  },
  emptyContainer: {
    marginTop: 36,
  },
  empty: {
    textAlign: "center",
  },
});

export default OrderList;
