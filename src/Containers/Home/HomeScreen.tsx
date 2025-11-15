import { Colors, Spacing } from '@/Constants'
import { useListMeme } from '@/Hooks/useListMeme'
import React, { useState } from 'react'
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native'
import CardImage from './Components/CardImage'
import Header from './Components/Header'
import { SkeletonMemeCard } from '@/Components'

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
    if (isFetching && !refreshing && memeList.length === 0) {
      // Show skeleton cards while loading
      return (
        <View style={styles.skeletonContainer}>
          {Array.from({ length: 6 }).map((_, index) => (
            <SkeletonMemeCard key={`skeleton-${index}`} />
          ))}
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
  skeletonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: Spacing.sm,
    paddingTop: Spacing.md,
  },
})
