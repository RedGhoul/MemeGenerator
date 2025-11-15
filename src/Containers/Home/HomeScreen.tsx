import { Colors, Spacing } from '@/Constants'
import { useListMeme } from '@/Hooks/useListMeme'
import React, { useState } from 'react'
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native'
import CardImage from './Components/CardImage'
import Header from './Components/Header'

const HomeScreen = () => {
  const { data, isFetching, refetch } = useListMeme()
  const memeList = (data as any[]) || []
  const [refreshing, setRefreshing] = useState(false)

  const handleRefresh = async () => {
    setRefreshing(true)
    await refetch()
    setRefreshing(false)
  }

  const renderItem = ({ item }: any) => {
    return <CardImage data={item} />
  }

  const renderLoading = () => {
    if (isFetching && !refreshing) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      )
    }
    return null
  }

  return (
    <View style={styles.container}>
      <Header />
      <FlatList
        data={memeList}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderLoading}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={Colors.primary}
            colors={[Colors.primary]}
            title="Pull to refresh"
            titleColor={Colors.textSecondary}
          />
        }
      />
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  listContent: {
    paddingHorizontal: Spacing.sm,
    paddingBottom: Spacing.lg,
    flexGrow: 1,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: Spacing.xxl,
  },
})
