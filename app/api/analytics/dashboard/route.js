import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { connectToDatabase } from '../../../lib/mongodb'

export async function GET(request) {
  try {
    const session = await getServerSession()
    
    if (!session) {
      return NextResponse.json(
        { success: false, message: 'No autorizado' },
        { status: 401 }
      )
    }

    const { db } = await connectToDatabase()
    const articlesCollection = db.collection('articles')

    // Obtener estadísticas del usuario
    const userId = session.user.id

    // Contar artículos por estado
    const totalArticles = await articlesCollection.countDocuments({ userId })
    const publishedArticles = await articlesCollection.countDocuments({ 
      userId, 
      status: 'published' 
    })
    const scheduledArticles = await articlesCollection.countDocuments({ 
      userId, 
      status: 'scheduled' 
    })
    const draftArticles = await articlesCollection.countDocuments({ 
      userId, 
      status: 'draft' 
    })

    // Calcular métricas agregadas
    const pipeline = [
      { $match: { userId } },
      {
        $group: {
          _id: null,
          totalImpressions: { $sum: '$analytics.impressions' },
          totalReactions: { $sum: '$analytics.reactions' },
          totalComments: { $sum: '$analytics.comments' },
          totalShares: { $sum: '$analytics.shares' },
          totalClicks: { $sum: '$analytics.clicks' },
          totalNewFollowers: { $sum: '$analytics.newFollowers' },
          avgEngagementRate: { $avg: '$analytics.engagementRate' }
        }
      }
    ]

    const analyticsResult = await articlesCollection.aggregate(pipeline).toArray()
    const analytics = analyticsResult[0] || {
      totalImpressions: 0,
      totalReactions: 0,
      totalComments: 0,
      totalShares: 0,
      totalClicks: 0,
      totalNewFollowers: 0,
      avgEngagementRate: 0
    }

    // Obtener artículos con mejor rendimiento
    const topArticles = await articlesCollection
      .find({ userId, status: 'published' })
      .sort({ 'analytics.impressions': -1 })
      .limit(3)
      .toArray()

    const topPerformingArticles = topArticles.map(article => ({
      id: article._id.toString(),
      title: article.title,
      impressions: article.analytics.impressions || 0,
      engagementRate: article.analytics.engagementRate || 0
    }))

    return NextResponse.json({
      success: true,
      analytics: {
        totalArticles,
        publishedArticles,
        scheduledArticles,
        draftArticles,
        totalImpressions: analytics.totalImpressions,
        totalReactions: analytics.totalReactions,
        totalComments: analytics.totalComments,
        totalShares: analytics.totalShares,
        totalClicks: analytics.totalClicks,
        averageEngagementRate: Math.round(analytics.avgEngagementRate * 100) / 100,
        newFollowers: analytics.totalNewFollowers,
        topPerformingArticles
      }
    })

  } catch (error) {
    console.error('Error obteniendo analytics del dashboard:', error)
    return NextResponse.json(
      { success: false, message: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
