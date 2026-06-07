import { Colors, Spacing } from '@/Constants'
import { useListMeme } from '@/Hooks/useListMeme'
import { useFavorites } from '@/Context/FavoritesContext'
import { MemeTemplate } from '@/Type'
import {
  filterMemesByKeyword,
  filterMemesByQuery,
  getPopularKeywords,
} from '@/Utils/memeFilter'
import React, { useMemo, useState } from 'react'
import { FlatList, RefreshControl, StyleSheet, View } from 'react-native'
import CardImage from './Components/CardImage'
import Header from './Components/Header'
import SearchBar from './Components/SearchBar'
import FilterChips, { FilterOption } from './Components/FilterChips'
import { EmptyState, SkeletonMemeCard } from '@/Components'

const FILTER_ALL = 'all'
const FILTER_FAVORITES = 'favorites'

const HomeScreen = () => {
  const { data, isFetching, isError, refetch } = useListMeme()
  const { favorites } = useFavorites()
  const memeList = useMemo<MemeTemplate[]>(() => data ?? [], [data])

  const [refreshing, setRefreshing] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState(FILTER_ALL)

  const filterOptions = useMemo<FilterOption[]>(() => {
    const keywords = getPopularKeywords(memeList).map((keyword) => ({
      id: keyword,
      label: keyword,
    }))
    return [
      { id: FILTER_ALL, label: 'All' },
      { id: FILTER_FAVORITES, label: 'Favorites' },
      ...keywords,
    ]
  }, [memeList])

  const filteredMemes = useMemo<MemeTemplate[]>(() => {
    let base = memeList
    if (activeFilter === FILTER_FAVORITES) {
      base = base.filter((meme) => favorites.has(meme.id))
    } else if (activeFilter !== FILTER_ALL) {
      base = filterMemesByKeyword(base, activeFilter)
    }
    return filterMemesByQuery(base, searchQuery)
  }, [memeList, activeFilter, favorites, searchQuery])

  const handleRefresh = async () => {
    setRefreshing(true)
    await refetch()
    setRefreshing(false)
  }

  const renderItem = ({ item }: { item: MemeTemplate }) => <CardImage data={item} />

  const renderEmpty = () => {
    if (isFetching && !refreshing && memeList.length === 0) {
      return (
        <View style={styles.skeletonContainer}>
          {Array.from({ length: 6 }).map((_, index) => (
            <SkeletonMemeCard key={`skeleton-${index}`} />
          ))}
        </View>
      )
    }

    if (isError && memeList.length === 0) {
      return (
        <EmptyState
          title="Couldn't load memes"
          message="Check your connection and try again."
          actionLabel="Retry"
          onAction={handleRefresh}
        />
      )
    }

    if (activeFilter === FILTER_FAVORITES) {
      return (
        <EmptyState
          title="No favorites yet"
          message="Tap the heart on any meme to save it here."
        />
      )
    }

    return (
      <EmptyState
        title="No memes found"
        message="Try a different search or filter."
      />
    )
  }

  return (
    <View style={styles.container}>
      <Header />
      <SearchBar value={searchQuery} onChangeText={setSearchQuery} />
      <FilterChips
        options={filterOptions}
        activeId={activeFilter}
        onSelect={setActiveFilter}
      />
      <FlatList
        data={filteredMemes}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmpty}
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
